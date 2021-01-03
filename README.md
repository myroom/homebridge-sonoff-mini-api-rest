[![npm](https://badgen.net/npm/v/homebridge-sonoff-mini-api-rest/latest)](https://www.npmjs.com/package/homebridge-sonoff-mini-api-rest)
[![npm](https://badgen.net/npm/dt/homebridge-sonoff-mini-api-rest)](https://www.npmjs.com/package/homebridge-sonoff-mini-api-rest)


# homebridge-sonoff-mini-api-rest

<a href="https://www.buymeacoffee.com/myroom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

This plug-in enables you to control your Sonoff Mini DIY mode light bulb. To switch to mode, follow this <a href="https://github.com/itead/Sonoff_Devices_DIY_Tools/blob/master/SONOFF%20DIY%20MODE%20Protocol%20Doc%20v1.4.md"> instruction</a>

## Installation

Run the following command
```
npm install -g homebridge-sonoff-mini-api-rest
```

Chances are you are going to need sudo with that.

## Config.json file

```json
	{
            "accessory": "Sonoff",
            "type": "lightbulb",
            "name": "Sonoff Mini DIY",
            "url": "http://192.168.1.24:8081",
            "id": "1000989596",
            "debug": false 
        }
```

| Key           | Description                                                                        |
|---------------|------------------------------------------------------------------------------------|
| accessory     | Required. Has to be "Sonoff"                                             			 |
| type          | Required. Type of accessory                                                        |
| name          | Required. The name of this accessory. This will appear in your Homekit app         |
| url           | Required. The url address that you discovered earlier                              |
| id            | Required. Id number																 |
| debug			| Optional. Debug mode																 |

## Issues

This software comes with no warranty. It works for me and it might for you.
