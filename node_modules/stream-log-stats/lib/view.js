'use strict'
var ansi = require('ansi-escape-sequences')
var tableLayout = require('table-layout')

exports.render = render

var visible = false
var previouslyRenderedLines = 0

function render (stats) {
  var clientsData = [
    {
      one: ansi.format('Clients', ['underline']),
      two: ansi.format('Requests', ['underline']),
      three: ansi.format('Transferred', ['underline'])
    },
    {
      one: stats.clientCount,
      two: stats.requests,
      three: stats.transferred
    }
  ]
  var clientsTable = tableLayout(clientsData)

  var extensionTable = tableLayout([
    {
      type: ansi.format('Extension', ['underline']),
      requests: ansi.format('Requests', ['underline']),
      bytes: ansi.format('Transferred', ['underline'])
    }
  ].concat(stats.topTypes))


  stats.topResources = stats.topResources.map(function (resourceLine) {
    var availableSpace = process.stdout.columns - 37
    if (resourceLine.resource.length > availableSpace) {
      var split = resourceLine.resource.split(/\s+/)
      resourceLine.resource = split[0] + ' ' + split[1] + ' ...' + split[2].substr(-(availableSpace))
    }
    return resourceLine
  })

  var resourceTable = tableLayout(
    [
      {
        resource: ansi.format('Resource', ['underline']),
        requests: ansi.format('Requests', ['underline']),
        bytes: ansi.format('Transferred', ['underline'])
      }
    ].concat(stats.topResources),
    {
      columns: [{ name: 'resource', break: true }]
    }
  )

  var output = clientsTable + '\n' + extensionTable + '\n' + resourceTable

  if (visible) {
    process.stderr.write(
      ansi.cursor.up(previouslyRenderedLines + (process.platform === 'win32' ? 1 : 0))
    )
  } else {
    visible = true
  }
  process.stderr.write(ansi.erase.display())
  var lines = output.split('\n')

  previouslyRenderedLines = 0
  for (var i = 0; i < lines.length && i < (process.stdout.rows - 2); i++) {
    console.error(lines[i])
    previouslyRenderedLines++
  }
}
