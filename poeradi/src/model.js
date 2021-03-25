import { Live2DCubismFramework as live2dcubismframework } from './webgl/Framework/live2dcubismframework';
import CubismFramework = live2dcubismframework.CubismFramework;
 
CubismFramework.startup();
CubismFramework.initialize();

import { Live2DCubismFramework as icubismmodelsetting } from './webgl/Framework/icubismmodelsetting';
import ICubismModelSetting = icubismmodelsetting.ICubismModelSetting;

import { Live2DCubismFramework as cubismmodelsettingjson } from './webgl/Framework/cubismmodelsettingjson';
import CubismModelSettingJson = cubismmodelsettingjson.CubismModelSettingJson;

const modelSetting = new CubismModelSettingJson(model3JsonArrayBuffer, model3JsonArrayBuffer.byteLength) as ICubismModelSetting;

