import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import gitClone from './utils/gitClone.js';
import prompts from 'prompts';
import { readFile } from 'fs/promises';
import { writePluginsConfig } from './utils/writePluginsConfig';
import { successLog } from './utils/successLog.js';
const pkg = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);
//配置命令参数
const optionDefinitions = [
  { name: 'version', alias: 'v', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean }
];

//帮助命令
const helpSections = [
  {
    header: 'create-yodn-ui',
    content: '一个快速开发组件库的脚手架'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'version',
        alias: 'v',
        typeLabel: '{underline boolean}',
        description: '版本号'
      },
      {
        name: 'help',
        alias: 'h',
        typeLabel: '{underline boolean}',
        description: '帮助'
      }
    ]
  }
];
const promptsOptions = [
  {
    type: 'text',
    name: 'name',
    message: '请输入项目名称'
  },
  {
    type: 'select', //单选
    name: 'template',
    message: '请选择一个模板',
    choices: [
      { title: 'yodn-ui', value: 1 },
    ]
  },
  {
    type: 'multiselect',
    name: 'plugins',
    message: '请选择插件【可多选】',
    choices: [
      { title: 'vue-router', value: "vue-router" },
      { title: 'pinna', value: 'pinna' },
      { title: 'axios', value: 'axios' }
    ]
  }
];
const options = commandLineArgs(optionDefinitions);

const remoteList = {
  1: 'https://github.com/qianyongdong/yodn-ui.git'
};

const getUserInfo = async () => {
  const res = await prompts(promptsOptions);
  if (!res.name || !res.template) return;
  //1.从git下载项目
  const cloneTemplate = await gitClone(`direct:${remoteList[res.template]}`, res.name, { clone: true });
  if (!cloneTemplate) {
    //没成功 直接退出
    return
  }
  //写入插件并配置
  const pluginsConfig = await writePluginsConfig(res.plugins, res.name);

  if (!pluginsConfig) {
    //没成功 直接退出
    return
  }
  //3.输出成功log
  successLog(res.name)
};
const runOptions = () => {
  if (options.version) {
    console.log(`v${pkg.version}`);
    return;
  }
  if (options.help) {
    console.log(commandLineUsage(helpSections));
    return;
  }
  getUserInfo();
};

runOptions();
