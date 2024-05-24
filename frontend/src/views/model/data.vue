<template>
  <div class="app-container">
    <div class="gambleShow-header">
      <el-form :model="form" class="demo-form-inline" :inline="true">
<!--        <el-form-item :label="lr">-->
<!--          <el-input-number v-model="form.lrNum" :precision="2" :step="0.01" :min="0.01" :max="0.1" />-->
<!--        </el-form-item>-->
<!--      <el-form-item label="训练轮次">-->
<!--          <el-input-number v-model="form.num" :min="10" />-->
<!--      </el-form-item>-->
      </el-form>
      <!-- <div class="mostBtn"> -->
        <!-- 模型测试 -->
      <div class="span-display1" style="width: 150px">
        <span style="display: inline-block; width: 150px; font-size: 20px; font-weight: bold">信用卡套现</span>
      </div>

      <el-upload
          class="uploadTest"
          action="http://127.0.0.1:8001/api_data/data/uploadTestDataXinyongka/"
          :on-preview="handlePreviewTest"
          :on-remove="handleRemoveTest"
          :before-remove="beforeRemoveTest"
          multiple
          :limit="1"
          :on-exceed="handleExceedTest"
          :file-list="fileListTest"
          name="testDataFile"
        >
        <el-tooltip class="item" effect="dark" content="只能上传信用卡套现场景的zip文件" placement="top-start">
          <el-button type="primary" round >测试数据上传</el-button></el-tooltip>
          <!-- <div slot="tip" class="el-upload__tip">只能上传zip文件</div> -->
      </el-upload>

        <el-upload
          class="uploadTrain"
          action="http://127.0.0.1:8001/api_data/data/uploadTrainDataXinyongka/"
          :on-preview="handlePreviewTrain"
          :on-remove="handleRemoveTrain"
          :before-remove="beforeRemoveTrain"
          multiple
          :limit="1"
          :on-exceed="handleExceedTrain"
          :file-list="fileListTrain"
          name="trainDataFile"
        >
          <el-tooltip class="item" effect="dark" content="只能信用卡套现场景的上传zip文件" placement="top-start">
            <el-button type="primary" round >训练数据上传</el-button>
          </el-tooltip>
        </el-upload>
        <el-button id="btn1" type="default" round @click="ProcessData1()">训练数据预处理</el-button>

        <!-- <el-divider direction="vertical"></el-divider> -->

        <!-- 模型训练 -->
        <!-- <span>模型训练</span> -->

        <el-button id="btn2" type="default" round @click="ProcessData2()">测试数据预处理</el-button>


      <div class="span-display2" style="width: 150px">
        <span style="display: inline-block; width: 150px; font-size: 20px; font-weight: bold">异常转账</span>
      </div>

      <el-upload
        class="uploadTest2"
        action="http://127.0.0.1:8001/api_data/data/uploadTestDataZhuanzhang/"
        :on-preview="handlePreviewTest"
        :on-remove="handleRemoveTest"
        :before-remove="beforeRemoveTest"
        multiple
        :limit="1"
        :on-exceed="handleExceedTest"
        :file-list="fileListTest"
        name="testDataFile"
      >
        <el-tooltip class="item" effect="dark" content="只能上传异常转账场景的zip文件" placement="top-start">
          <el-button type="primary" round >测试数据上传</el-button></el-tooltip>
        <!-- <div slot="tip" class="el-upload__tip">只能上传zip文件</div> -->
      </el-upload>

      <el-upload
        class="uploadTrain2"
        action="http://127.0.0.1:8001/api_data/data/uploadTrainDataZhuanzhang/"
        :on-preview="handlePreviewTrain"
        :on-remove="handleRemoveTrain"
        :before-remove="beforeRemoveTrain"
        multiple
        :limit="1"
        :on-exceed="handleExceedTrain"
        :file-list="fileListTrain"
        name="trainDataFile"
      >
        <el-tooltip class="item" effect="dark" content="只能上传异常转账场景的zip文件" placement="top-start">
          <el-button type="primary" round >训练数据上传</el-button>
        </el-tooltip>
      </el-upload>
      <el-button id="btn12" type="default" round @click="ProcessData3()">训练数据预处理</el-button>

      <!-- <el-divider direction="vertical"></el-divider> -->

      <!-- 模型训练 -->
      <!-- <span>模型训练</span> -->

      <el-button id="btn22" type="default" round @click="ProcessData4()">测试数据预处理</el-button>
        <!-- <el-divider direction="vertical"></el-divider> -->

        <!-- 模型下载 -->
        <!-- <span>模型下载</span> -->
<!--        <el-button id="btn3" type="primary" round @click="download()">模型下载</el-button>-->
        <!-- <div class="clear"></div> -->
      <!-- </div> -->

    <!-- <el-upload>
       ref="upload"
       class="uploadTrain"
       action="http://127.0.0.1:8000/api_store_fraud/store_fraud/uploadTrainData/"
       :on-preview="handlePreview"
       :on-remove="handleRemove"
       :file-list="fileList"
       :auto-upload="false"
       name="datafile"
     >
       <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
       <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传zip文件</div>
     </el-upload> -->


    </div>

<!--    <el-table-->
<!--      v-loading="loading"-->
<!--      :data="gambleTestList"-->
<!--      height="800"-->
<!--      border-->
<!--      style="width: 35%;"-->
<!--      :header-cell-style="{background:'#eef1f6',color:'#606266'}"-->
<!--    >-->
<!--      <el-table-column-->
<!--        prop="id"-->
<!--        label="序号"-->
<!--        width="135"-->
<!--      >-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.$index + 1 }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="cardID"-->
<!--        label="卡ID"-->
<!--        width="255"-->
<!--      />-->
<!--    </el-table>-->
<!--    <div class="container" style="width: 35%">-->
<!--      <div id="textChart1" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--      <div id="textChart2" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--      <div id="textChart3" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--    </div>-->
<!--    <div class="container1" style="width: 35%">-->
<!--      <div id="textChart1" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--      <div id="textChart2" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--      <div id="textChart3" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--    </div>-->


<!--    <div class="container" style="width: 32.5%;">-->
<!--      <div id="textChart1" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--      <div id="textChart2" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--      <div id="textChart3" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--    </div>-->
<!--    <div id="bingDiv" class="container" style="width: 32.5%;">-->
<!--      <div id="bingChart" class="chart" style="height:300px;width:100%;" />-->
<!--    </div>-->
<!--    <div class="container" style="width: 65%;">-->
<!--      <div id="chart" class="chart" style="height:500px;width:100%;padding: 5px 0;" />-->
<!--    </div>-->
    <span style="display:block; text-align:center; font-size: 30px; font-weight: bold; margin-top: 30px">数据集数据分布</span>
    <div style="width: 100%; height: 60px">
      <span style="width: 50%; display:inline-block; text-align:center; font-size: 25px; font-weight: bold; margin-top: 10px;float: left">信用卡套现</span>
      <span style="width: 50%; display:inline-block; text-align:center; font-size: 25px; font-weight: bold; margin-top: 10px;float: right">异常转账</span>
    </div>
    <div style="width: 100%" class="two-tables">
      <div style="width: 49%; height: 100%; display: inline-block;">
<!--        <div style="width: 100%; display: flex; justify-content: center; align-items: center; height: 50px">-->
<!--          <span style="display: inline-block; width: 150px; font-size: 20px; font-weight: bold">信用卡套现</span>-->
<!--        </div>-->
        <el-table
          :data="tableData1"
          border
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
          style="width: 80%; margin-left: 10%; font-size: 18px; font-weight: bold; margin-top: 10px; margin-bottom: 10px">
          <el-table-column
            prop="attribute"
            label=""
            width="200">
          </el-table-column>
          <el-table-column
            prop="train"
            label="训练数据"
            width="180">
          </el-table-column>
          <el-table-column
            prop="test"
            label="测试数据">
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 49%; height: 100%; display: inline-block; margin-left: 20px">
        <el-table
          :data="tableData2"
          border
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
          style="width: 80%; margin-left: 10%; font-size: 18px; font-weight: bold; margin-top: 10px;margin-bottom: 10px">
          <el-table-column
            prop="attribute"
            label=""
            width="200">
          </el-table-column>
          <el-table-column
            prop="train"
            label="训练数据"
            width="180">
          </el-table-column>
          <el-table-column
            prop="test"
            label="测试数据">
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      fileListTest: [],
      fileListTrain: [],
      loading: false,
      gambleTestList: null, // 查询之后接口返回集合
      btnDisabled: false,
      radio1: 2,
      is_create: '',
      form: {
        lrNum: 0.01,
        num: 10
      },
      process_form: {
        dataset: 'xinyongka',
        data_type: 'train'
      },
      lr: '学习率' + '\xa0\xa0\xa0',
      tableData1: [{
        attribute: '卡数量',
        train: '0',
        test: '0'
      }, {
        attribute: '商户数量',
        train: '0',
        test: '0'
      }, {
        attribute: '节点数量',
        train: '0',
        test: '0'
      }, {
        attribute: '交易数量',
        train: '0',
        test: '0'
      }, {
        attribute: '异常卡数量',
        train: '0',
        test: '0'
      }, {
        attribute: '异常交易数量',
        train: '0',
        test: '0'
      }, {
        attribute: '异常卡比例',
        train: '0',
        test: '0'
      }, {
        attribute: '异常交易比例',
        train: '0',
        test: '0'
      }],
      tableData2: [{
        attribute: '卡数量',
        train: '0',
        test: '0'
      }, {
        attribute: '商户数量',
        train: '0',
        test: '0'
      }, {
        attribute: '节点数量',
        train: '0',
        test: '0'
      }, {
        attribute: '交易数量',
        train: '0',
        test: '0'
      }, {
        attribute: '异常卡数量',
        train: '0',
        test: '0'
      }, {
        attribute: '异常交易数量',
        train: '0',
        test: '0'
      }, {
        attribute: '异常卡比例',
        train: '0',
        test: '0'
      }, {
        attribute: '异常交易比例',
        train: '0',
        test: '0'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'gambleModel_data',
      'gambleTest_data',
      'sdf',
      'processed_data',
      'data_distribution'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    download() {
      window.location.href = 'http://127.0.0.1:8001/api_gambling/gambling/downloadModel/'
    },
    handlePreviewTest(file) {
      console.log(file)
    },
    handleRemoveTest(file, fileListTest) {
      console.log(file, fileListTest)
    },
    beforeRemoveTest(file, fileListTest) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceedTest(files, fileListTest) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileListTest.length} 个文件`)
    },

    handlePreviewTrain(file) {
      console.log(file)
    },
    handleRemoveTrain(file, fileListTrain) {
      console.log(file, fileListTrain)
    },
    beforeRemoveTrain(file, fileListTrain) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceedTrain(files, fileListTrain) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileListTrain.length} 个文件`)
    },

    submitUpload() {
      this.$refs.upload.submit()
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    ProcessData1() {
      this.process_form.dataset = 'xinyongka'
      this.process_form.data_type = 'train'
      this.$store.dispatch('uploadData/processData', this.process_form).then(response => {
        this.loading = true
        console.log('1234:', this.processed_data)
        this.getDataDistribution()
      })
    },
    ProcessData2() {
      this.process_form.dataset = 'xinyongka'
      this.process_form.data_type = 'test'
      this.$store.dispatch('uploadData/processData', this.process_form).then(response => {
        this.loading = true
        console.log('1234:', this.processed_data)
        this.getDataDistribution()
      })
    },
    ProcessData3() {
      this.process_form.dataset = 'zhuanzhang'
      this.process_form.data_type = 'train'
      this.$store.dispatch('uploadData/processData', this.process_form).then(response => {
        this.loading = true
        console.log('1234:', this.processed_data)
        this.getDataDistribution()
      })
    },
    ProcessData4() {
      this.process_form.dataset = 'zhuanzhang'
      this.process_form.data_type = 'test'
      this.$store.dispatch('uploadData/processData', this.process_form).then(response => {
        this.loading = true
        console.log('1234:', this.processed_data)
        this.getDataDistribution()
      })
    },
    init() {
      this.getDataDistribution()
      // this.$store.dispatch('uploadData/processData').then(response => {
      //   this.loading = true
      //   console.log('1234:', this.processed_data)
      //
      // })
      // this.$store.dispatch('gambling/gambleModelInit').then(response => {
      //   // this.showChartGamble()
      //   this.loading = true
      //   this.$store.dispatch('gambling/gambleTestInit').then(response => {
      //     this.gambleTestList = this.gambleTest_data['cardlist']
      //     this.loading = false
      //     console.log('This is test_data:', this.gambleTest_data)
      //     this.showTextChart1()
      //     this.showTextChart2()
      //     this.showTextChart3()
      //     this.showBingChart()
      //   })
      // })
    },
    getDataDistribution() {
      this.$store.dispatch('uploadData/dataDistribution').then(response => {
        this.loading = true
        console.log('getDataDistribution:', this.data_distribution)
        this.tableData1 = this.data_distribution['xinyongka']
        this.tableData2 = this.data_distribution['zhuanzhang']
      })
    },
    create() {
      this.$confirm('此操作将会运行模型并返回结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '模型生成中!'
        })
        const loadingInstance = Loading.service({ // 启动loading服务
          target: document.getElementById('chart'),
          fullscreen: false
        })
        this.$store.dispatch('gambling/gambleModelShow', this.form).then(response => {
          console.log('This is backData', this.gambleModel_data)
          loadingInstance.close()// 关闭loading服务
          this.showChartGamble()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    testShow() {
      this.$confirm('此操作将会进行模型测试并返回结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '模型测试中!'
        })
        const loadingInstance1 = Loading.service({ // 启动loading服务
          target: document.getElementById('textChart1'),
          fullscreen: false
        })
        const loadingInstance2 = Loading.service({ // 启动loading服务
          target: document.getElementById('textChart2'),
          fullscreen: false
        })
        const loadingInstance3 = Loading.service({ // 启动loading服务
          target: document.getElementById('textChart3'),
          fullscreen: false
        })
        const loadingInstance4 = Loading.service({ // 启动loading服务
          target: document.getElementById('bingChart'),
          fullscreen: false
        })
        this.loading = true
        this.$store.dispatch('gambling/gambleTestShow').then(response => {
          // console.log('This is backData', this.registerTest_data)
          loadingInstance1.close()// 关闭loading服务
          loadingInstance2.close()// 关闭loading服务
          loadingInstance3.close()// 关闭loading服务
          loadingInstance4.close()// 关闭loading服务
          this.gambleTestList = this.gambleTest_data['cardlist']
          this.loading = false

          this.showTextChart1()
          this.showTextChart2()
          this.showTextChart3()
          this.showBingChart()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },

    showChartGamble() {
      this.chart = echarts.init(document.getElementById('chart'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: '#36424A',
        title: {
          text: '稳定性分析',
          textStyle: {
            color: '#fff'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(55,57,61)',
          borderColor: '#37391F',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['A', 'R', 'F1'],
          icon: 'circle',
          itemWidth: 15,
          itemHeight: 15,
          itemGap: 13,
          right: '4%',
          top: 20,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#D6D6D6'
            }
          },
          data: this.gambleModel_data['epoch']
        },
        yAxis: {
          type: 'value',
          min: 'dataMin',
          max: 'dataMax',
          axisLine: {
            lineStyle: {
              color: '#D6D6D6'
            }
          }
        },
        series: [
          {
            name: 'A',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(213, 23, 0, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(213, 23, 0, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(213, 23, 0)',
                borderColor: 'rgba(213, 23, 0, 0.27)',
                borderWidth: 12
              }
            },
            data: this.gambleModel_data['accuracy']
          },
          {
            name: 'R',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(158, 157, 131, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(158, 157, 131, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(158, 157, 131)',
                borderColor: 'rgba(158, 157, 131, 0.2)',
                borderWidth: 12
              }
            },
            data: this.gambleModel_data['recall-macro']
          },
          {
            name: 'F1',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(204, 202, 102, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(204, 202, 102, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(204, 202, 102)',
                borderColor: 'rgba(204, 202, 102, 0)',
                borderWidth: 12
              }
            },
            data: this.gambleModel_data['f1-macro']
          }
        ]
      }
      this.chart.setOption(option)
    },
    showTextChart1() {
      this.chart = echarts.init(document.getElementById('textChart1'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(128, 128, 128, 0.1)', // rgba设置透明度0.1
        title: {
          text: '准确率：',
          left: '20%',
          top: '35%',
          textStyle: {
            fontSize: 20,
            color: '#364056'
          }

        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '55%',
              top: 'center',
              style: {
                // text: '0.1194',
                text: this.gambleModel_data['accuracy_'],
                fontSize: 20,
                fontWeight: 'bold',
                // lineDash: [0, 200],
                // lineDashOffset: 0,
                // fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              }
              // keyframeAnimation: {
              //   duration: 3000,
              //   loop: true,
              //   keyframes: [
              //     {
              //       percent: 0.7,
              //       style: {
              //         fill: 'transparent',
              //         lineDashOffset: 200,
              //         lineDash: [200, 0]
              //       }
              //     },
              //     {
              //       // Stop for a while.
              //       percent: 0.8,
              //       style: {
              //         fill: 'transparent'
              //       }
              //     },
              //     {
              //       percent: 1,
              //       style: {
              //         fill: 'black'
              //       }
              //     }
              //   ]
              // }
            }
          ]
        }
      }
      this.chart.setOption(option)
    },
    showTextChart2() {
      this.chart = echarts.init(document.getElementById('textChart2'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(128, 128, 128, 0.1)', // rgba设置透明度0.1
        title: {
          text: '召回率：',
          left: '20%',
          top: '35%',
          textStyle: {
            fontSize: 20,
            color: '#364056'
          }

        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '55%',
              top: 'center',
              style: {
                // text: '0.8888',
                text: this.gambleModel_data['recall_macro'],
                fontSize: 20,
                fontWeight: 'bold',
                // lineDash: [0, 200],
                // lineDashOffset: 0,
                // fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              }
              // keyframeAnimation: {
              //   duration: 3000,
              //   loop: true,
              //   keyframes: [
              //     {
              //       percent: 0.7,
              //       style: {
              //         fill: 'transparent',
              //         lineDashOffset: 200,
              //         lineDash: [200, 0]
              //       }
              //     },
              //     {
              //       // Stop for a while.
              //       percent: 0.8,
              //       style: {
              //         fill: 'transparent'
              //       }
              //     },
              //     {
              //       percent: 1,
              //       style: {
              //         fill: 'black'
              //       }
              //     }
              //   ]
              // }
            }
          ]
        }
      }
      this.chart.setOption(option)
    },
    showTextChart3() {
      this.chart = echarts.init(document.getElementById('textChart3'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(128, 128, 128, 0.1)', // rgba设置透明度0.1
        title: {
          text: 'F1分数：',
          left: '20%',
          top: '35%',
          textStyle: {
            fontSize: 20,
            color: '#364056'
          }

        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '55%',
              top: 'center',
              style: {
                // text: '0.9999',
                text: this.gambleModel_data['f1_macro'],
                fontSize: 20,
                fontWeight: 'bold',
                // lineDash: [0, 200],
                // lineDashOffset: 0,
                // fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              }
              // keyframeAnimation: {
              //   duration: 3000,
              //   loop: true,
              //   keyframes: [
              //     {
              //       percent: 0.7,
              //       style: {
              //         fill: 'transparent',
              //         lineDashOffset: 200,
              //         lineDash: [200, 0]
              //       }
              //     },
              //     {
              //       // Stop for a while.
              //       percent: 0.8,
              //       style: {
              //         fill: 'transparent'
              //       }
              //     },
              //     {
              //       percent: 1,
              //       style: {
              //         fill: 'black'
              //       }
              //     }
              //   ]
              // }
            }
          ]
        }
      }
      this.chart.setOption(option)
    },
    showBingChart() {
      this.chart = echarts.init(document.getElementById('bingChart'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        title: {
          text: '预测结果',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: 'bottom',
          itemWidth: 15,
          itemHeight: 15,
          itemGap: 10
        },
        color: ['#00437C', '#007D85'],
        series: [
          {
            name: '个数',
            type: 'pie',
            radius: '60%',
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            // data: [{ value: 1048, name: '预测结果1个数' },
            //       { value: 735, name: '预测结果0个数' },]
            data: this.gambleModel_data['pie']
          }
        ]
      }

      this.chart.setOption(option)
    }

  }

}
</script>

<style scoped>
.el-table{
  float: left;
  overflow: hidden
}
.container{
  /* width: 50%; */
  float: left;
  overflow: hidden
}
.container1{
  /* width: 50%; */
  float: right;
  overflow: hidden
}
.gambleShow-header{
  margin: 10px auto;
  width: 100%;
  height: 175px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, .04);
}
.el-form{
  padding-left: 25%;
  padding-top: 30px;
}
.el-form--inline .el-form-item{
  margin-right: 0px;
}
.el-input-number{
  margin-right: 30px;
}
.train-data-process{
  position: absolute;
  margin-top: 10px;
  margin-left: 100px;
  background-color: #bfcbd9;
  height: 150px;
}
.span-display1{
  position: absolute;
  display: inline-block;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 10px;
}
.span-display2{
  position: absolute;
  display: inline-block;
  margin-top: 80px;
  margin-left: 30px;
  margin-right: 10px;
}

.uploadTest{
  position: absolute;
  display: inline-block;
  margin-left: 200px;
  margin-right: 10px;
}
.uploadTrain{
  position: absolute;
  margin-left: 400px;
  display: inline-block;
  /* margin-left: 10px; */
  margin-right: 10px;
}
.uploadTest2{
  position: absolute;
  display: inline-block;
  margin-top: 70px;
  margin-left: 200px;
  margin-right: 10px;
}
.uploadTrain2{
  position: absolute;
  margin-left: 400px;
  margin-top: 70px;
  display: inline-block;
  /* margin-left: 10px; */
  margin-right: 10px;
}
/* .mostBtn{
  clear: both;
  overflow: hidden;
} */
#btn1{
  position: absolute;
  margin-left: 600px;
}
#btn12{
  position: absolute;
  margin-left: 600px;
  margin-top: 70px;
}
.clear{
  clear: both;        /*将clear设置清除浮动*/
  overflow: hidden;
}
#btn2{
  position: absolute;
  margin-left:780px;
}
#btn22{
  position: absolute;
  margin-top: 70px;
  margin-left:780px;
}
#btn3{
  position: absolute;
  margin-left: 790px;
}
.two-tables{
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
