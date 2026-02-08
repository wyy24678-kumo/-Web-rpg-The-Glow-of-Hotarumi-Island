/**
 * game.js - 游戏主界面逻辑
 * 负责 game.html 的交互处理
 */

const GameUI = {
    init: function() {
        console.log("GameUI: 初始化游戏界面...");
        this.bindEvents();
    },

    bindEvents: function() {
        // 绑定选项按钮点击事件
        const choices = document.querySelectorAll('.choice-btn');
        choices.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                console.log(`GameUI: 点击了选项 ${index + 1}: ${btn.innerText}`);
                // TODO: 对接剧情系统，加载下一段文本
            });
        });

        // 绑定侧边栏按钮
        const menuBtns = document.querySelectorAll('.sidebar-menu .btn');
        menuBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const icon = e.target.innerText;
                console.log(`GameUI: 点击了功能按钮 ${icon}`);
                if (icon === '⚙️') {
                    // TODO: 显示设置弹窗
                    alert("设置功能开发中...");
                } else if (icon === '🎒') {
                    // TODO: 显示背包
                    alert("背包功能开发中...");
                }
            });
        });
    }
};

// 启动游戏逻辑
window.addEventListener('load', () => {
    GameUI.init();
});
