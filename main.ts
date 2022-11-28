WiFiIoT.on_wifi_connect(function (IP_Address, Device_ID) {
    basic.showIcon(IconNames.Yes)
})
WiFiIoT.on_thingspeak_conn(function (Status, Error_code) {
    OLED.clear()
    OLED.writeStringNewLine("thingspeak" + Status)
    OLED.writeStringNewLine("error" + Error_code)
})
OLED.init(128, 64)
WiFiIoT.initializeWifi(SerialPin.P16, SerialPin.P8)
WiFiIoT.setWifi("", "")
let light2 = 0
let soil_moisture = 0
basic.forever(function () {
    if (WiFiIoT.is_wifi_connect()) {
        light2 = SmartCity.read_light_sensor(AnalogPin.P0)
        soil_moisture = Environment.ReadSoilHumidity(AnalogPin.P2)
        OLED.clear()
        OLED.writeStringNewLine("light " + light2)
        OLED.writeStringNewLine("soil moisture " + soil_moisture)
        WiFiIoT.sendThingspeak(
        "",
        light2,
        soil_moisture
        )
        basic.pause(15000)
    }
})
