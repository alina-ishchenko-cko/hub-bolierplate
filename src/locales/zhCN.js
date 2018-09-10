export class zhCN {
  static get(m) {
    let _res = [];
    _res['Hello,'] = '欢迎,';

    // Main Menu
    _res['My Business'] = '我的事';
    _res['Dashboard'] = _res['dashboard'] = '仪表板';
    _res['Transactions'] = _res['transaction'] = '交易';
    _res['Customers'] = '顾客';
    _res['Payment Plans'] = '付款计划';
    _res['Deposits'] = '存款';
    _res['Reports'] = '报告';

    _res['Settings'] = '设置';
    _res['Risks'] = '风险';
    _res['User Management'] = '用户管理';
    _res['Pricing Profiles'] = '定价配置文件';

    _res['User'] = '用户';
    _res['User Settings'] = _res['user-settings'] = '用户设置';
    _res['Log-out'] = '登出';

    // Dashboard

    _res['Indicators'] = '指标';
    _res['Revenue'] = '收入';
    _res['Approved Sales'] = '批准的销售';
    _res['Refunds'] = '补偿';
    _res['Chargebacks'] = '退款';

    // transactions

    _res['id'] = '识别号';
    _res['time'] = '时';
    _res['customer Name'] = '顾客姓名';
    _res['status'] = '状态';
    _res['amount'] = '量';
    _res['scheme'] = '方案';
    _res['response Code'] = '响应代码';
    _res['business Name'] = '业务名称';
    _res['customer Email'] = '客户电子邮件';
    _res['track Id'] = '轨道识别号';

    // user settings

    _res['Language'] = '语言';
    _res['Select a Language'] = '选择语言';

    // Date

    _res['Today'] = '今天';
    _res['Yesterday'] = '昨天';
    _res['This Week'] = '本星期';
    _res['Past Week'] = '上周';
    _res['This Month'] = '这个月';
    _res['Past Month'] = '上个月';

    // Main

    _res[
      'Please select an Account from the universal control at the top of the page by searching or by picking from the list'
    ] =
      '请从页面顶部的通用控件中选择一个帐户，方法是搜索或从列表中选择';

    if (_res[m]) return _res[m];
    else return m;
  }
}
