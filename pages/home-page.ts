// 这页就是把 Playwright 官网的首页封装成了一个 Page Object Model (POM) 类，方便在测试中复用。
import { type Locator, type Page, expect } from '@playwright/test';

// 1. 定义一个 HomePage 类，表示 Playwright 官网的首页。
export class HomePage {
    readonly page: Page; //游览器页面对象，所有的操作都将在这个页面上进行。
    readonly getStartedButton: Locator; //定位器，用于找到首页上的 "Get started" 链接按钮。
    readonly pageTitle: RegExp; //正则表达式，用于匹配首页的标题，确保页面加载正确。

    // 2. 写一个构造函数，定义每个元素的定位器和页面标题。这里只是定义了怎么找到这些元素，并没有实际操作它们。
    constructor(page: Page) {
        this.page = page;
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.pageTitle = /Playwright/;
    }

    // 3. 写一个方法，这里就是实际操作页面的逻辑。点击 "Get started" 链接按钮。
    async clickGetStarted() {
        await this.getStartedButton.click();
    }

    // 4. 然后这里也是一个方法，用于断言页面标题是否正确。确保我们在正确的页面上。
    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.pageTitle);
    }
}

export default HomePage; // 5. 最后导出这个类，以后在其他测试文件中就可以直接导入使用这个 HomePage 类了。