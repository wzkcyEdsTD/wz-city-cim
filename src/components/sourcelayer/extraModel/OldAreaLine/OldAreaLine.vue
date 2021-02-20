<template>
  <div class="old-line">
    <ul
      v-if="forceGridOldArea"
      class="routeLinks"
    >
      <li
        v-for="(item, i) in arealist"
        :key="i"
        :class="{ active: i == forceIndex }"
        @click="forceIndex = i"
      >
       {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import rtinfo from "./routerline.json";
import { mapGetters, mapActions } from "vuex";
import { CenterPoint, angle3d } from "mock/overview.js";
export default {
  name: "oldArea",
  data() {
    return {
      rtinfo,
      doFollow: false,
      forceIndex: 0,
      arealist:[{
        name:"上陡门十二组团",
        position:{
          x:-2874732.9781303406,
          y:4843349.914780079,
          z:2995346.4715013886
        },
      },{
        name:"东港小区",
        position:{
          x: -2873796.825761212,
          y: 4843013.332512377, 
          z: 2995752.3990083723
        }
      },{
        name:"吕浦花园",
        position:{
          x: -2873877.3190829987, y: 4843701.497852895, z: 2995240.9585291888
        }
      },{
        name:"返回",
        position:{}
      }]
    };
  },
  watch:{
    forceGridOldArea:{
      handler(n) {
        if(n)
        {
          this.initWalk(n);
        }

      },
    },
    forceIndex: {
      handler(n) {
        this.changeview(this.arealist[n].name);
      },
    },
  },
  computed: {
    ...mapGetters("map", ["forceGridOldArea"]),
  },
  created() {
    this.test();
  },
  methods: {
    ...mapActions("map", ["setForceGridOldArea"]),
    test(){
      console.log(this.forceGridOldArea)
    },
    
    changeview(name){
      if(name == "返回")
      {
        this.shutDownRoute();
        window.earth.scene.camera.flyTo(CenterPoint);
      }
      else{
        var position = this.arealist.filter((item)=>{
          return item.name == name;
        })
        window.earth.camera.flyTo({
          destination: {
            x:position[0].position.x,
            y:position[0].position.y,
            z:position[0].position.z,
          },
          orientation: {
            heading: 6.273152309608067,
            pitch: -1.5486446198730626,
            roll: 0,
          },
        });
      }  
    },

    initWalk(data) {
      //this.shutDownRoute();
      var position = this.arealist.filter((item)=>{
        return item.name == data;
      })
      // this.rtinfo = this.rtinfo.filter((item)=>{
      //   return item.AreaName == data;
      // })
      // console.log(this.rtinfo.map((v) => [parseFloat(v.STARTX), parseFloat(v.STARTY),50,parseFloat(v.ENDX),parseFloat(v.ENDY),50]).flat(1));
      this.rtinfo.map((item, index) => {
        var positions = [parseFloat(item.STARTX),parseFloat(item.STARTY),50,parseFloat(item.ENDX),parseFloat(item.ENDY),50];
        window.earth.entities.add({
          id:'old_area_'+index,
          name:'old_area_line',
          polyline:new Cesium.PolylineGraphics({
              show:true,
              positions:Cesium.Cartesian3.fromDegreesArrayHeights(positions),
              width:20,
              height:20,
              disableDepthTestDistance: Number.POSITIVE_INFINITY,
              material:new Cesium.ImageMaterialProperty({
                image:'/static/images/map-ico/arrow.png',
                repeat : new Cesium.Cartesian2(1, 1),
                transparent:true
            })
          })
        })
      })
      //console.log(window.billboardMap["old_area_point"]);
      // window.earth.flyTo(window.earth.entities.getById('old_area_0'), {
      //   offset: {
      //     heading: Cesium.Math.toRadians(0), //左右方向
      //     pitch: Cesium.Math.toRadians(-90), //上下方向
      //   },
      // });
      window.earth.camera.flyTo({
        destination: {
          x:position[0].position.x,
          y:position[0].position.y,
          z:position[0].position.z,
        },
        orientation: {
          heading: 6.273152309608067,
          pitch: -1.5486446198730626,
          roll: 0,
        },
      });
    },

    shutDownRoute() {
      this.setForceGridOldArea(undefined);
      this.rtinfo.map((item, index) => {
        var entity = window.earth.entities.getById('old_area_'+index);
        window.earth.entities.remove(entity);
      })
    },
  },
};
</script>

<style lang="less" scoped>
.old-line {
  position: fixed;
  top: 16vh;
  left: 50%;
  transform: translateX(-50%);
  .routeLinks {
    border-radius: 1vh;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.8);
    margin-bottom: 1vh;
    > li {
      color: rgba(255, 255, 255, 0.7);
      padding: 0 1vh;
      height: 2.8vh;
      line-height: 2.8vh;
      cursor: pointer;
      &:nth-child(odd) {
        background-color: rgba(17, 46, 93, 0.8);
      }
      &:nth-child(even) {
        background-color: rgba(29, 77, 155, 0.8);
      }
      &.active {
        font-weight: bold;
        color: white;
      }
    }
  }
  .walk-man-operation {
    text-align: center;
    > span {
      display: inline-block;
      padding: 0.4vh 1vh;
      border-radius: 1vh;
      box-sizing: border-box;
      background-color: rgba(29, 77, 155, 0.8);
      color: white;
      border: 1px solid #597beb;
      font-size: 1.6vh;
      vertical-align: middle;
      cursor: pointer;
      &:hover {
        background-color: rgba(17, 46, 93, 0.8);
      }
    }
  }
}
</style>
