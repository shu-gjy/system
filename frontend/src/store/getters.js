const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  // 伪冒注册
  register_recreate_data: state => state.register.register_recreate_data,
  registerModel_data: state => state.register.registerModel_data, // 异常转账模型展示
  registerTest_data: state => state.register.registerTest_data, // 异常转账模型测试展示

  // 异常转账
  abnormal_recreate_data: state => state.abnormalTrans.abnormal_recreate_data,
  abnormal_model_data: state => state.abnormalTrans.abnormal_model_data, // 异常转账模型展示&测试展示

  // 信用卡违规套现
  credit_recreate_data: state => state.creditCardCash.credit_recreate_data,
  creditModel_date: state => state.creditCardCash.creditModel_date, // 异常转账模型展示
  creditTest_data: state => state.creditCardCash.creditTest_data, // 异常转账模型测试展示

  // 赌博
  gambling_recreate_data: state => state.gambling.gambling_recreate_data,
  gambleModel_data: state => state.gambling.gambleModel_data, // 异常转账模型展示
  gambleTest_data: state => state.gambling.gambleTest_data, // 异常转账模型测试展示

  // 黄牛营销
  marketing_recreate_data: state => state.marketing.marketing_recreate_data,
  marketModel_data: state => state.marketing.marketModel_data, // 异常转账模型展示
  marketTest_data: state => state.marketing.marketTest_data, // 异常转账模型测试展示

  // 商户违规
  storeFraud_recreate_data: state => state.storeFraud.storeFraud_recreate_data,
  storeModel_data: state => state.storeFraud.storeModel_data, // 异常转账模型展示
  storeTest_data: state => state.storeFraud.storeTest_data, // 异常转账模型测试展示

  // 数据上传
  processed_data: state => state.uploadData.processed_data,
  data_distribution: state => state.uploadData.data_distribution,

  // APGNN
  apgnn_training_data: state => state.apgnn.apgnn_training_data,
  apgnn_test_data: state => state.apgnn.apgnn_test_data,

  // TAHIA
  tahia_training_data: state => state.tahia.tahia_training_data,
  tahia_test_data: state => state.tahia.tahia_test_data,

  // DyTES
  dytes_training_data1: state => state.dytes.dytes_training_data1,
  dytes_test_data1: state => state.dytes.dytes_test_data1,
  dytes_training_data2: state => state.dytes.dytes_training_data2,
  dytes_test_data2: state => state.dytes.dytes_test_data2
}
export default getters
