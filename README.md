# Summary

A system for accessing, viewing and controlling different things at home from a mobile phone and a website.
The system will control the connected lights in the house (ikea tradfri), the greenhouse, and will display the internal and external temperature.

- **V0.1:** Android app that when we are connected to home wifi accesses the data of the node-red server.
We will connect the **greenhouse**, the **tradfri gateway** to control the lights and plugs and an **outdoor temperature and humidity sensor** and a **panel / screen to display data in the dining room. (??)**.

- **V0.2:** Android app will connect to the cloud when we are not connected to the home wifi network. in this cloud we will be able to visualize the information of the house, but we will not be able to control anything (perhaps the greenhouse? ...).

# Detail
## Hardware:
### Server Node-network:
the node red server will receive all the signals from the different devices and process them.
You will receive the signals from the greenhouse and the external temperature sensor via mqtt and the tradfri signals through the functions of the system itself.

### Tradfri gateway:
The tradfri gateway will act as a gateway between the lights / plugs and the node-network server.

### Greenhouse:
The greenhouse will send the temperature and humidity of the earth to the node red server and will receive the signals to open and close the light of the node-red server.
** V0.2 **: The greenhouse will also receive the order to water the plants.

### Outdoor temperature:
It will consist of an external temperature and humidity sensor that will periodically send the temperature and humidity reading to the node-network server.
It consists of a wemos D1 cpu running in deepSleep mode. This will connect every 30 minutes and send the temperature reading to the server.

## Software

### App:
App react-native, only for android and unpublished.
it will consist of two screens, one of light control and the other of control of the greenhouse.
It will also consist of a header where you will get the indoor and outdoor temperature and a display of whether the system is connected ok or not. (and a small weather forecast ??).
- **light control:** When opening it, we will ask the node-red server to send us an Array of objects which will contain all the lights we have, their name and status. pressing one of the switches will send the same Array to the server and the server will look for the differences with its current state and update the corresponding lights. When the status of the lights changes, we will send the ARRAY again with all the lights.
- **greenhouse control:** When opening it, we will see the status of the greenhouse (light, temperature and humidity of the earth.). We can open and close the lamp manually or program it to open and close according to a schedule.
*future:*
- To be able to water the plants, either automatically depending on the humidity or manually.
- Incorporate a light sensor to be able to turn on the light automatically or calculate / evaluate the amount of light received by plants.

# Future:
## Hardware:
### Information panel:
It can be an LCD or LED display or an LED array. in the future a smartMirror ??.
This will collect the indoor and outdoor temperature and also system information such as if any item is not working properly.
What else can you pick up ??

## Software:
### App V2:
- Incorporate notifications (push?)
- connection from outside the home: We could add an external websockets server to which we could connect when we did not detect the wifi network in our home.
- Through this external server we could visualize the status of the house and maybe control some things