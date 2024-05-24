<template>
  <div class="app-container">
    <div class="abnormalShow-header">
      <el-form ref="form" :inline="true">
        <el-form-item label="T">
          <el-input-number v-model="T" :min="1" />
        </el-form-item>
        <!-- <el-button type="primary" round size="large" @click="create()">训练&测试</el-button> -->
      </el-form>

      <el-upload
        class="upload"
        action="http://127.0.0.1:8001/api_abnormal/abnormal/uploadTrainData/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        name="trainDataFile"
      >
        <el-tooltip class="item" effect="dark" content="只能上传zip文件" placement="top-start">
          <el-button type="primary" round>数据上传</el-button>
        </el-tooltip>
      </el-upload>
      <el-button id="btn1" type="primary" round @click="create()">训练&测试</el-button>
      <!--      <el-form
        class="uploadTest"
        enctype="multipart/form-data"
        action="http://127.0.0.1:8000/api_store_fraud/store_fraud/uploadTestData/"
        method="post"
      > -->
      <!--        <el-form-item>
          <input type="file" name="datafileTest">
          <button type="submit">上传测试数据</button>
        </el-form-item>
      </el-form> -->
      <!--      <el-form
        class="uploadTrain"
        enctype="multipart/form-data"
        action="http://127.0.0.1:8000/api_store_fraud/store_fraud/uploadTrainData/"
        method="post"
      > -->
      <!--        <el-form-item>
          <input type="file" name="datafileTrain">
          <button type="submit">上传训练数据</button>
        </el-form-item> -->
      <!-- </el-form> -->

    </div>

    <el-table
      v-loading="loading"
      :data="abnormalTestList"
      height="800"
      border
      style="width: 35%;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column
        prop="id"
        label="序号"
        width="135"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="cardID"
        label="卡ID"
        width="255"
      />
    </el-table>
    <div class="container" style="width: 32.5%;">
      <div id="textChart1" class="chart" style="height:100px;width:100%;padding: 0 5px;" />
      <div id="textChart2" class="chart" style="height:100px;width:100%;padding: 0 5px;" />
      <div id="textChart3" class="chart" style="height:100px;width:100%;padding: 0 5px;" />
    </div>
    <div id="bingDiv" class="container" style="width: 32.5%;">
      <div id="bingChart" class="chart" style="height:300px;width:100%;" />
    </div>
    <div class="container" style="width: 65%;">
      <div id="chart" class="chart" style="height:500px;width:100%;padding: 5px 0;" />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      loading: false,
      abnormalTestList: [], // 查询之后接口返回集合
      btnDisabled: false,
      T: 1,
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'abnormal_model_data'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // submitUpload() {
    //   this.$refs.upload.submit()
    // },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePreview(file) {
    //   console.log(file)
    // },
    init() {
      this.loading = true
      this.$store.dispatch('abnormalTrans/abnormalModelInit').then(response => {
        this.abnormalTestList = this.abnormal_model_data['data_2']['cardlist']
        this.loading = false
        console.log('This is backData:', this.abnormal_model_data)
        this.showChartAbnormal()
        this.showTextChart1()
        this.showTextChart2()
        this.showTextChart3()
        this.showBingChart()
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
        this.$store.dispatch('abnormalTrans/abnormalModelShow', this.T).then(response => {
          console.log('This is backData', this.abnormal_model_data)
          loadingInstance.close()// 关闭loading服务
          loadingInstance1.close()// 关闭loading服务
          loadingInstance2.close()// 关闭loading服务
          loadingInstance3.close()// 关闭loading服务
          loadingInstance4.close()// 关闭loading服务
          this.loading = false
          this.abnormalTestList = this.abnormal_model_data['data_2']['cardlist']
          this.showChartAbnormal()
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
    showChartAbnormal() {
      this.chart1 = echarts.init(document.getElementById('chart'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: '#4C4F4A',
        title: {
          text: '异常转账模型侦测',
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
          data: ['P', 'R', 'F1'],
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
          data: this.abnormal_model_data['data_1']['epoch']
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
            name: 'P',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(201, 145, 68, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(201, 145, 68, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(201, 145, 68)',
                borderColor: 'rgba(201, 145, 68, 0.27)',
                borderWidth: 12
              }
            },
            data: this.abnormal_model_data['data_1']['accuracy']
          },
          {
            name: 'R',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(171, 170, 120, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(171, 170, 120, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(171, 170, 120)',
                borderColor: 'rgba(171, 170, 120, 0.2)',
                borderWidth: 12
              }
            },
            data: this.abnormal_model_data['data_1']['recall-macro']
          },
          {
            name: 'F1',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(222, 116, 135, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(222, 116, 135, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(222, 116, 135)',
                borderColor: 'rgba(222, 116, 135, 0)',
                borderWidth: 12
              }
            },
            data: this.abnormal_model_data['data_1']['f1-macro']
          }
        ]
      }
      this.chart1.setOption(option)
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
                text: this.abnormal_model_data['data_2']['accuracy'],
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
                text: this.abnormal_model_data['data_2']['recall_macro'],
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
                text: this.abnormal_model_data['data_2']['f1_macro'],
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
            //   { value: 735, name: '预测结果0个数' }]
            data: this.abnormal_model_data['data_2']['pie']
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
.abnormalShow-header{
  margin: 10px auto;
  width: 100%;
  height: 110px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, .04);
}
.el-form{
  padding-left: 40px;
  padding-top: 30px;
}
.el-form-item{
  margin-right: 30px;
}
.upload{
  position: absolute;
  margin-left: 300px;
  margin-top: -62px;
}
#btn1{
  position: absolute;
  margin-left: 440px;
  margin-top: -62px;
}
</style>
