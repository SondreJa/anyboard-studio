let htmlTemplate = ''
htmlTemplate += '<!DOCTYPE html>\n'
htmlTemplate += '<html>\n'
htmlTemplate += '<head>\n'
htmlTemplate += '  <meta charset="utf-8" />\n'
htmlTemplate += '  <meta name="viewport" content="width=device-width, user-scalable=no\n'
htmlTemplate += ' initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />\n'
htmlTemplate += '\n'
htmlTemplate += '  <title>AnyboardGameDemo</title>\n'
htmlTemplate += '\n'
htmlTemplate += '  <style>\n'
htmlTemplate += '    @import \'ui/css/evothings-app.css\';\n'
htmlTemplate += '  </style>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- cordova.js based -->\n'
htmlTemplate += '  <script src="cordova.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- AnyboardJS libraries -->\n'
htmlTemplate += '  <script src="dist/anyboard.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- Bluetooth driver and dependencies-->\n'
htmlTemplate += '  <script src="libs/evothings/evothings.js"></script>\n'
htmlTemplate += '  <script src="libs/evothings/easyble/easyble.js"></script>\n'
htmlTemplate += '  <script src="drivers/discovery.evothings.bluetooth.js"></script>\n'
htmlTemplate += '  <script src="drivers/bean.evothings.bluetooth.js"></script>\n'
htmlTemplate += '  <script src="drivers/rfduino.evothings.bluetooth.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- We\'ve used jquery for quick development -->\n'
htmlTemplate += '  <script src="libs/jquery-1.11.3.min.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <script>\n'
htmlTemplate += '    $(document).ready(function(){\n'
htmlTemplate += '      $("#summary").show();\n'
htmlTemplate += '      $("#main").hide();\n'
htmlTemplate += '    });\n'
htmlTemplate += '  </script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <script>\n'
htmlTemplate += '    var app;\n'
htmlTemplate += '    app = {\n'
htmlTemplate += '      currentColor: "some value",\n'
htmlTemplate += '      devices: {},\n'
htmlTemplate += '      currentTile: "white",\n'
htmlTemplate += '      connectedPlayers: 0,\n'
htmlTemplate += '      requiredPlayers: [null, null],\n'
htmlTemplate += '\n'
htmlTemplate += '      //REPLACEMEOKAY//\n'
htmlTemplate += '\n'
htmlTemplate += '      // Discover bluetooth tokens in proximity\n'
htmlTemplate += '      discover: function () {\n'
htmlTemplate += '        var self = this;\n'
htmlTemplate += '        AnyBoard.TokenManager.scan(\n'
htmlTemplate += '          // success function to be executed upon _each_ token that is discovered\n'
htmlTemplate += '          function (token) {\n'
htmlTemplate += '            self.addDiscovered(token);\n'
htmlTemplate += '          },\n'
htmlTemplate += '          // function to be executed upon failure\n'
htmlTemplate += '          function (errorCode) {\n'
htmlTemplate += '            console.log(errorCode)\n'
htmlTemplate += '          }\n'
htmlTemplate += '        );\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Function to be executed upon having discovered a token\n'
htmlTemplate += '      addDiscovered: function (token) {\n'
htmlTemplate += '        if (!this.devices[token.name]) {\n'
htmlTemplate += '          this.devices[token.name] = token;\n'
htmlTemplate += '\n'
htmlTemplate += '          // Add button for token to body\n'
htmlTemplate += '          //document.body.innerHTML += \'<button type="button" id="\' + token.name + \'" onclick="app.connect(\' + "\'" + token.name + "\'" + \')" class="grey">\' + token.name + \' </button><br />\';\n'
htmlTemplate += '          $("#tokens").append(\'<button type="button" id="\' + token.name + \'" onclick="app.connect(\' + "\'" + token.name + "\'" + \')" class="grey">\' + token.name + \' </button><br />\');\n'
htmlTemplate += '\n'
htmlTemplate += '          // Add listener to be executed if the token connects\n'
htmlTemplate += '          token.on(\'connect\', function () {\n'
htmlTemplate += '            this.connectedPlayers += 1;\n'
htmlTemplate += '            document.getElementById(token.name).className = \'green\';\n'
htmlTemplate += '            if (app.requiredPlayers[0] === null || ((this.connectedPlayers >= app.requiredPlayers[0])\n'
htmlTemplate += '              && (this.connectedPlayers <= app.requiredPlayers[1]))) {\n'
htmlTemplate += '              $(\'#next\').show()\n'
htmlTemplate += '            }\n'
htmlTemplate += '            //$("#token_feedback").append(\'<button type="button" onclick="app.verifyColor(\' + "\'" + token.name + "\'" + \')"class="indicator3"> Verify color</button><br />\');\n'
htmlTemplate += '          });\n'
htmlTemplate += '\n'
htmlTemplate += '          // Add listener to be executed if the token disconnects\n'
htmlTemplate += '          token.on(\'disconnect\', function () {\n'
htmlTemplate += '            document.getElementById(token.name).className = \'red\';\n'
htmlTemplate += '          });\n'
htmlTemplate += '        }\n'
htmlTemplate += '\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Attempts to connect to token.\n'
htmlTemplate += '      connect: function (tokenName) {\n'
htmlTemplate += '        var token = this.devices[tokenName];\n'
htmlTemplate += '\n'
htmlTemplate += '        // If already connecting, stop\n'
htmlTemplate += '        if (document.getElementById(tokenName).className == \'blue\')\n'
htmlTemplate += '          return;\n'
htmlTemplate += '\n'
htmlTemplate += '        // If already connected, attempt to send green led command\n'
htmlTemplate += '        if (document.getElementById(tokenName).className == \'green\') {\n'
htmlTemplate += '          this.sendVibrationCmd(token);\n'
htmlTemplate += '          return;\n'
htmlTemplate += '        }\n'
htmlTemplate += '\n'
htmlTemplate += '        // Signal that we\'re attempting to connect\n'
htmlTemplate += '        document.getElementById(tokenName).className = \'blue\';\n'
htmlTemplate += '        // Send connect command.\n'
htmlTemplate += '        token.connect();\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Feedback commands\n'
htmlTemplate += '      sendVibrationCmd: function (token) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the VIBRATE command");\n'
htmlTemplate += '          hyper.log(data)\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the VIBRATE command");\n'
htmlTemplate += '          hyper.log(errorMsg);\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (!(app.tokenVal[token.id].includes(\'vibrate\'))) {\n'
htmlTemplate += '            token.vibrate([100],\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.vibrate([100],\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendVibrationPatternCmd: function (token, pattern) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the VIBRATEPATTERN command");\n'
htmlTemplate += '          hyper.log(data)\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the VIBRATEPATTERN command");\n'
htmlTemplate += '          hyper.log(errorMsg);\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (!(app.tokenVal[token.id].includes(\'vibratePattern\'))) {\n'
htmlTemplate += '            token.vibratePattern(pattern,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.vibratePattern(pattern,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendLedOnCmd: function (token, ledArray) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the LEDON command");\n'
htmlTemplate += '          hyper.log(data)\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the LEDON command");\n'
htmlTemplate += '          hyper.log(errorMsg);\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (!(app.tokenVal[token.id].includes(\'ledon\'))) {\n'
htmlTemplate += '            token.ledOn(ledArray,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.ledOn(ledArray,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendLedBlinkCmd: function (token, time, frequency) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the LEDBLINK command");\n'
htmlTemplate += '          hyper.log(data)\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the LEDBLINK command");\n'
htmlTemplate += '          hyper.log(errorMsg);\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (!(app.tokenVal[token.id].includes(\'ledblink\'))) {\n'
htmlTemplate += '            token.ledBlink(time, frequency,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.ledBlink(time, frequency,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendMatrixCmd: function (token, grid, time) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the MATRIX command");\n'
htmlTemplate += '          hyper.log(data)\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the MATRIX command");\n'
htmlTemplate += '          hyper.log(errorMsg);\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (!(app.tokenVal[token.id].includes(\'matrix\'))) {\n'
htmlTemplate += '            token.matrix(grid, time,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.matrix(grid, time,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendMatrixTextCmd: function (token, text, time) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the MATRIXTEXT command");\n'
htmlTemplate += '          hyper.log(data)\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the MATRIXTEXT command");\n'
htmlTemplate += '          hyper.log(errorMsg);\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (!(app.tokenVal[token.id].includes(\'matrixText\'))) {\n'
htmlTemplate += '            token.matrixText(text, time,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.matrixText(text, time,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendCountCmd: function (token, num1, num2, time) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the COUNT command");\n'
htmlTemplate += '          hyper.log(data)\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the COUNT command");\n'
htmlTemplate += '          hyper.log(errorMsg);\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (!(app.tokenVal[token.id].includes(\'count\'))) {\n'
htmlTemplate += '            token.count(num1, num2, time,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.count(num1, num2, time,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      next_panel: function () {\n'
htmlTemplate += '        $("#summary").hide();\n'
htmlTemplate += '        app.initiate();\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getSector: function (token) {\n'
htmlTemplate += '        for (var key in this.devices){\n'
htmlTemplate += '          if (this.devices[key] == token){\n'
htmlTemplate += '            return this.devices[key].sector;\n'
htmlTemplate += '          }\n'
htmlTemplate += '        }\n'
htmlTemplate += '        return false;\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getRandomToken: function () {\n'
htmlTemplate += '        var obj_keys = Object.keys(app.devices);\n'
htmlTemplate += '        var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];\n'
htmlTemplate += '        return app.devices[ran_key];\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getRandomSector: function () {\n'
htmlTemplate += '        return app.sectorVals[Math.floor(Math.random() * app.sectorVals.length)]\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      showTextPrompt: function (value) {\n'
htmlTemplate += '        $(\'#promptField\').html(value)\n'
htmlTemplate += '        $(\'#textprompt\').show()\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      mathRandomInt: function (a, b) {\n'
htmlTemplate += '        if (a > b) {\n'
htmlTemplate += '          // Swap a and b to ensure a is smaller.\n'
htmlTemplate += '          var c = a;\n'
htmlTemplate += '          a = b;\n'
htmlTemplate += '          b = c;\n'
htmlTemplate += '        }\n'
htmlTemplate += '        return Math.floor(Math.random() * (b - a + 1) + a);\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getTextPrompt: function () {\n'
htmlTemplate += '        return $(\'#promptField\').value\n'
htmlTemplate += '        $(\'#textprompt\').hide()\n'
htmlTemplate += '      }\n'
htmlTemplate += '\n'
htmlTemplate += '    };\n'
htmlTemplate += '  </script>\n'
htmlTemplate += '</head>\n'
htmlTemplate += '\n'
htmlTemplate += '<body ontouchstart="">\n'
htmlTemplate += '<div id="summary">\n'
htmlTemplate += '  <button type="button" class="black" onclick="app.discover()">\n'
htmlTemplate += '    Discover Bluetooth devices\n'
htmlTemplate += '  </button>\n'
htmlTemplate += '  <div id="tokens"></div>\n'
htmlTemplate += '  <button type="button" onclick="app.next_panel()" class="black" id="next" style="display: none;"> Next </button>\n'
htmlTemplate += '</div>\n'
htmlTemplate += '<div id="connected"></div>\n'
htmlTemplate += '<div id="token_constraint">\n'
htmlTemplate += '  <h1 id="title">Game Title</h1>\n'
htmlTemplate += '  <h1>Messages</h1>\n'
htmlTemplate += '\n'
htmlTemplate += '  <div id="messagediv">\n'
htmlTemplate += '    <p id="message1"></p>\n'
htmlTemplate += '    <p id="message2"></p>\n'
htmlTemplate += '    <p id="message3"></p>\n'
htmlTemplate += '  </div>\n'
htmlTemplate += '\n'
htmlTemplate += '  <div id="numberdiv">\n'
htmlTemplate += '    <p id="number1"></p>\n'
htmlTemplate += '    <p id="number2"></p>\n'
htmlTemplate += '    <p id="number3"></p>\n'
htmlTemplate += '  </div>\n'
htmlTemplate += '</div>\n'
htmlTemplate += '</body>\n'
htmlTemplate += '\n'
htmlTemplate += '<style>\n'
htmlTemplate += '  #messagediv {\n'
htmlTemplate += '    word-wrap: break-word;\n'
htmlTemplate += '  }\n'
htmlTemplate += '</style>\n'
htmlTemplate += '\n'
htmlTemplate += '</html>\n'

export default htmlTemplate
