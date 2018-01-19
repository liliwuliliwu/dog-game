/**
 * Created by admin on 16/4/1.
 */
function xzArea(options) {
    if (!(this instanceof xzArea)) {
        return new xzArea(options);
    }
    this.options = {
        select1: options.select1 || '',
        select2: options.select2 || '',
        k1: options.k1 || 'name',
        k2: options.k2 || 'cities'
    }
    //默认选中
    this.selected1 = options.selected1 || '';
    this.selected2 = options.selected2 || '';

    this.checkOpts();
    var select1 = this.select1 = this.selector(this.options.select1);
    var select2 = this.select2 = this.selector(this.options.select2);
    this.initSelects();
    //初始化select1
    var map2 = this.map2 = {};
    for (var i in this.cityMap) {
        map2[this.cityMap[i][this.options.k1]] = this.cityMap[i];
        var opt = document.createElement('option')
        opt.value = opt.text = this.cityMap[i][this.options.k1];
        if (opt.value == this.selected1) {
            opt.selected = 'selected';
            this.select(opt.value, this.selected2);
        }
        this.select1.add(opt);
    }
    var that = this;
    this.select1.onchange = function (event) {
        var val1 = event.target.value;
        that.select(val1);
    }
}

//选中某个状态
xzArea.prototype.select = function (val1, val2) {
    while (this.select2.childNodes[1]) {
        this.select2.remove(1);
    }
    if (this.map2[val1][this.options.k2] != undefined) {
        var val2arr = this.map2[val1][this.options.k2];
        for (var j in val2arr) {
            var opt2 = document.createElement('option');
            opt2.value = opt2.text = val2arr[j];
            if (opt2.value == val2) {
                opt2.selected = 'selected';
            }
            this.select2.add(opt2);
        }
    }
}

//检测选项
xzArea.prototype.checkOpts = function () {
    if (!this.options.select1 || !this.options.select2) {
        throw new Error('请指定select1和select2选项');
    }
}

//获取对象
xzArea.prototype.selector = function (ident) {
    if (typeof(ident) == 'object') {
        return ident;
    } else if (typeof(ident) == 'string') {
        return document.querySelector(ident);
    }
}

//初始化select
xzArea.prototype.initSelects = function () {
    var selectAll = document.createElement('option');
    selectAll.setAttribute('value', '');
    selectAll.innerHTML = '选择城市';
    this.select1.appendChild(selectAll);
    this.select2.appendChild(selectAll.cloneNode(true));
}

//城市数据
xzArea.prototype.cityMap = [{name: "北京", cities: []},
    {name: "天津", cities: []},
    {name: "河北", cities: ["石家庄", "秦皇岛", "廊坊", "保定", "邯郸", "唐山", "邢台", "衡水", "张家口", "承德", "沧州", "衡水"]},
    {name: "山西", cities: ["太原", "大同", "长治", "晋中", "阳泉", "朔州", "运城", "临汾"]},
    {name: "内蒙古", cities: ["呼和浩特", "赤峰", "通辽", "锡林郭勒", "兴安"]},
    {name: "辽宁", cities: ["大连", "沈阳", "鞍山", "抚顺", "营口", "锦州", "丹东", "朝阳", "辽阳", "阜新", "铁岭", "盘锦", "本溪", "葫芦岛"]},
    {name: "吉林", cities: ["长春", "吉林", "四平", "辽源", "通化", "延吉", "白城", "辽源", "松原", "临江", "珲春"]},
    {name: "黑龙江", cities: ["哈尔滨", "齐齐哈尔", "大庆", "牡丹江", "鹤岗", "佳木斯", "绥化"]},
    {name: "上海", cities: []},
    {
        name: "江苏",
        cities: ["南京", "苏州", "无锡", "常州", "扬州", "徐州", "南通", "镇江", "泰州", "淮安", "连云港", "宿迁", "盐城", "淮阴", "沐阳", "张家港"]
    },
    {name: "浙江", cities: ["杭州", "金华", "宁波", "温州", "嘉兴", "绍兴", "丽水", "湖州", "台州", "舟山", "衢州"]},
    {name: "安徽", cities: ["合肥", "马鞍山", "蚌埠", "黄山", "芜湖", "淮南", "铜陵", "阜阳", "宣城", "安庆"]},
    {name: "福建", cities: ["福州", "厦门", "泉州", "漳州", "南平", "龙岩", "莆田", "三明", "宁德"]},
    {name: "江西", cities: ["南昌", "景德镇", "上饶", "萍乡", "九江", "吉安", "宜春", "鹰潭", "新余", "赣州"]},
    {name: "山东", cities: ["青岛", "济南", "淄博", "烟台", "泰安", "临沂", "日照", "德州", "威海", "东营", "荷泽", "济宁", "潍坊", "枣庄", "聊城"]},
    {name: "河南", cities: ["郑州", "洛阳", "开封", "平顶山", "濮阳", "安阳", "许昌", "南阳", "信阳", "周口", "新乡", "焦作", "三门峡", "商丘"]},
    {name: "湖北", cities: ["武汉", "襄樊", "孝感", "十堰", "荆州", "黄石", "宜昌", "黄冈", "恩施", "鄂州", "江汉", "随枣", "荆沙", "咸宁"]},
    {name: "湖南", cities: ["长沙", "湘潭", "岳阳", "株洲", "怀化", "永州", "益阳", "张家界", "常德", "衡阳", "湘西", "邵阳", "娄底", "郴州"]},
    {
        name: "广东",
        cities: ["广州", "深圳", "东莞", "佛山", "珠海", "汕头", "韶关", "江门", "梅州", "揭阳", "中山", "河源", "惠州", "茂名", "湛江", "阳江", "潮州", "云浮", "汕尾", "潮阳", "肇庆", "顺德", "清远"]
    },
    {name: "广西", cities: ["南宁", "桂林", "柳州", "梧州", "来宾", "贵港", "玉林", "贺州"]},
    {name: "海南", cities: ["海口", "三亚"]},
    {name: "重庆", cities: []},
    {name: "四川", cities: ["成都", "达州", "南充", "乐山", "绵阳", "德阳", "内江", "遂宁", "宜宾", "巴中", "自贡", "康定", "攀枝花"]},
    {name: "贵州", cities: ["贵阳", "遵义", "安顺", "黔西南", "都匀"]},
    {name: "云南", cities: ["昆明", "丽江", "昭通", "玉溪", "临沧", "文山", "红河", "楚雄", "大理"]},
    {name: "西藏", cities: ["拉萨", "林芝", "日喀则", "昌都"]},
    {name: "陕西", cities: ["西安", "咸阳", "延安", "汉中", "榆林", "商南", "略阳", "宜君", "麟游", "白河"]},
    {name: "甘肃", cities: ["兰州", "金昌", "天水", "武威", "张掖", "平凉", "酒泉"]},
    {name: "青海", cities: ["黄南", "海南", "西宁", "海东", "海西", "海北", "果洛", "玉树"]},
    {name: "宁夏", cities: ["银川", "吴忠"]},
    {name: "新疆", cities: ["乌鲁木齐", "哈密", "喀什", "巴音郭楞", "昌吉", "伊犁", "阿勒泰", "克拉玛依", "博尔塔拉"]},
    {name: "香港", cities: []},
    {name: "澳门", cities: []}];

