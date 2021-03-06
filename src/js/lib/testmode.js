import util from './util.js';
export default {
    maparea: require('../tpl/maparea.tpl'),
    curgold: 10000,
    curBuildNum: 0,
    curSelectArea: null,
    areaArr: {
        lands:[
            {"uid":"7","land_id":"1","build_type":"0","left_income_num":"0"},
            {"uid":"7","land_id":"2","build_type":"0","left_income_num":"0"},
            {"uid":"7","land_id":"3","build_type":"0","left_income_num":"0"},
            {"uid":"7","land_id":"4","build_type":"0","left_income_num":"0"},
            {"uid":"7","land_id":"5","build_type":"0","left_income_num":"0"},
            {"uid":"7","land_id":"6","build_type":"0","left_income_num":"0"},
            {"uid":"7","land_id":"7","build_type":"0","left_income_num":"0"},
            {"uid":"7","land_id":"8","build_type":"0","left_income_num":"0"}
        ]
    },
    gameviewInit: function(){
        var self = this;
        document.styleSheets[0].addRule('.main-view div.userinfo-wrap::before','width: 50%');
        $('.js-login-wrap,.js-reg-wrap').addClass('hide');
        $('.js-main-view,.js-user-saibao').removeClass('hide');
        $('.js-jb-show').html(self.curgold);
        $('.js-user-name').html('还没有名字');
        $('.js-activation_code_num').html();
        $('.js-user-avatar').attr({
            src: '//cbd.tcpan.com/mex/cbd/img/page/dog.jpg'
        })
        $('.js-user-switch,.js-active,.js-go-qr-view,.js-go-jiaoyi,.js-user-fans').addClass('hide');
        self.testBind();
        self.drawArea();
        $('.js-user-shouzu-bt').attr({
            src: '/mex/cbd/img/shouzu/shouzu_3.png'
        });
    },
    drawArea: function(){
        var self = this;
        var newArr = [],b;
        self.areaArr.lands.forEach(function(item, index, array) {
            var a = Math.floor(index / 4);
            if (b !== a) {
                b = a;
                newArr[a] = new Array();
            }
            newArr[a].push(item);         
        });
        $('.js-area-wrap').html(self.maparea({
            Math: Math,
            dataarr: newArr
        }));
    },
    addBuild: function(buildtype, gold){
        var self = this;
        if(gold > self.curgold){
            util.windowToast('金币不足');
            return;
        }
        self.curBuildNum ++;
        self.curgold -= gold;
        $('.js-jb-show').html(self.curgold);
        self.areaArr.lands.forEach(function(item, index, array) {
            if(item.land_id == self.curSelectArea.attr('land_id')){
                item.build_type = buildtype;
            }
        });
        self.drawArea();
    },
    removeBuild: function(land_id){

    },
    testBind: function(){
        var self = this;
        /** 增加金币 */
        $('.js-user-shouzu-bt').on('click', function(){
            $('.js-shouzu-add').html('+' + 28 * self.curBuildNum).removeClass('hide');
            self.curgold += 28 * self.curBuildNum;
            $('.js-jb-show').html(self.curgold);
            setTimeout(()=>{
                $('.js-shouzu-add').addClass('hide');
            }, 200);
        })
        /** 选地建筑 */
        /**选地建筑逻辑 */
        $('.js-area-wrap').on('click', '.area-unit', function(){
            self.curSelectArea = $(this);
            if($(this).attr('build_type') == 0){
                $('.select-build-wrap').removeClass('hide');
            }else{
                //$('.js-destory-building').removeClass('hide');
            }
        });
        $('.js-sb-list > li').on('click', function(){
            $('.js-sb-list > .cur').removeClass('cur');
            $(this).addClass('cur');
            console.log($(this).find('.sbl-gold').html());
        });
        /**选地取消 */
        $('.js-sb-cancel').on('click', function(){
            $('.select-build-wrap').addClass('hide');
        });
        /**选地确认 */
        $('.js-sb-sure').on('click', function(){
            self.addBuild($('.js-sb-list > .cur').data('type'), $('.js-sb-list > .cur').find('.sbl-gold').html());
            $('.select-build-wrap').addClass('hide');
        });
        /** 拆迁 */
        $('.js-db-sure').on('click', function(){
            util.windowToast('拆迁完成');
            $('.js-destory-building').addClass('hide');
        });
        $('.js-user-saibao').on('click', function(){
            console.log(1);
        })
        $('.js-user-switch').on('click', function(){
            console.log(2);
        })
    }
}