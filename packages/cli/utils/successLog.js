import chalk from 'chalk';
export default (name) => {
    console.log(chalk.green(`cd ${name}\r\n`));
    console.log(chalk.blue('pnpm install\r\n'));
    console.log('pnpm run build\r\n');
    console.log('pnpm run dev\r\n');
}
