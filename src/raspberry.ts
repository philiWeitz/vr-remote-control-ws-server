
export function setPWM(pulseWidth: number) {
  console.log(pulseWidth);
}


/*
 * For the Raspberry Client install the packages and uncomment the following code
 *
 * npm install pigpio @types/pigpio
 */

/*
const Gpio = require('pigpio').Gpio;

const motor = new Gpio(18, {mode: Gpio.OUTPUT});


export function setPWM(pulseWidth: number) {
  motor.servoWrite(pulseWidth);
}
*/