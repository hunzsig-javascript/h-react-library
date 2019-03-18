#h-react-library <a href="https://github.com/hunzsig/h-react-library" target="_blank">GitHub</a>
##h-react-library是在antd,iceDesign基础上更进一步的常用react组件库
##更新日志

###2019/03/17
优化了staticLayout在大屏幕下的体现

###2019/03/01
修复了adminLayout中部分路径地址无法获取的bug
为了与css同步样式，DesktopForm里面的itemtype全部改为驼峰形式


###2019/02/28
adminLayout增加了一个路由参数singleMenu，设为true时顶部菜单会隐藏，登出按钮会合并到左侧菜单。singleMenu的菜单只会有index层路由



###2019/02/14
增加了默认组件的I18n


###2019/02/13
修复了表单输入空格时的怪异操作感
增加了外置I18n处理流程


###2019/01/17
修复了ws无权时跳转null的问题


###2019/01/09
修复了http复数请求时，无法加密请求的问题


###2018/11/22
修复了当请求的stack key过长时，localStorage报错的bug（限定小于某个值才执行cache）

###2018/11/09
修复了LocalTable filter 为空时，搜索按钮显示的问题
FilterTable新增onQuery事件


###2018/11/08
修复了number input无法输入小数点后 0 的问题


###2018/11/01
Api优化改版


###2018/10/10
修复DesktopForm 部分组件 输入错误无法显示的问题
新增DesktopForm 子组件 search


###2018/10/09
现在Auth的loginPath可以手动设置
删除了filterTable的renderImg功能
修复了DesktopForm textarea 输出错乱的问题


###2018/09/29
修复了Picture无法实时刷新UI的bug


###2018/09/28
优化了Api组件的无权提示
优化了HOSS组件，新增最大上传文件数目限制，{params->max}
新增组件Picture，用于显示多图,支持自定义style


###2018/09/27
修复了FilterTable初始分页5页无效的问题
FilterTable现在默认不会再排序，需要column设置sortable


###2018/09/26
修复了Api.cache获取数据错误的问题
修复了Excel Upload出错的问题


###2018/09/21
删除了各种Form，合并为一个DesktopForm


###2018/08/27
新增AntvG2


###2018/08/17
新增Excel


###2018/08/06
localTable完成筛选器，优化了分页信息的展示
修复所有Table组件的row selector后renderColumn无效的bug


###2018/07/11
FilterTable支持自定义列内容renderColumn
Form新增checkbox checkboxCol


###2018/07/10
Formregion支持搜索
Form新增自定义级联


###2018/07/09
优化FilterTable布局


###2018/07/04
新增FilterTable
新增SimpleForm
新增CommonJson


###2018/06/20
新增UnitForm


###2018/06/18
升级 h-ice-cli 随最新版


###2018/06/07
路由拆分，更细化，通过修改config文件对应不同方式
增加路由loading动画
升级 h-ice-cli 1.1.7


###2018/06/06
修复了通用组件List数字类型判断错误的bug
优化了时间日期选择的便利性


###2018/06/05
增加了页面TestList，以学习通用组件List



###2018/06/01
\- start -

