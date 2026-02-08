/**
 * ui.js - 界面交互逻辑
 * 负责 DOM 操作、按钮点击及界面渲染。
 */

const UI = {
    // 界面元素缓存
    elements: {
        mainMenu: null,
        gameScreen: null, // 新增：游戏主界面
        btnStart: null,
        btnContinue: null
    },

    // 初始化主菜单
    initMainMenu: function(onStartGame, onLoadGame) {
        console.log("UI: 初始化主菜单...");
        
        // 获取 DOM 元素
        this.elements.mainMenu = document.getElementById('main-menu');
        this.elements.gameScreen = document.getElementById('game-screen'); // 获取游戏界面
        this.elements.btnStart = document.getElementById('btn-start');
        this.elements.btnContinue = document.getElementById('btn-continue');

        // 绑定事件
        if (this.elements.btnStart) {
            this.elements.btnStart.addEventListener('click', () => {
                console.log("UI: 点击【开始旅途】");
                this.switchToGameScreen(); // 切换界面
                if (typeof onStartGame === 'function') {
                    onStartGame();
                }
            });
        } else {
            console.error("UI: 未找到【开始旅途】按钮");
        }
        
        // ... 继续旅途逻辑同理 (略)
        if (this.elements.btnContinue) {
            this.elements.btnContinue.addEventListener('click', () => {
                console.log("UI: 点击【继续旅途】");
                // 暂时也切换到游戏界面，实际应加载存档
                this.switchToGameScreen(); 
                if (typeof onLoadGame === 'function') {
                    onLoadGame();
                }
            });
        }
    },

    // 切换到游戏主界面
    switchToGameScreen: function() {
        if (this.elements.mainMenu) {
            this.elements.mainMenu.style.display = 'none'; // 隐藏菜单
        }
        if (this.elements.gameScreen) {
            this.elements.gameScreen.style.display = 'flex'; // 显示游戏界面
        }
    },

    // 隐藏主菜单（供后续流程使用）
    hideMainMenu: function() {
        if (this.elements.mainMenu) {
            this.elements.mainMenu.style.display = 'none';
        }
    },

    // 显示主菜单
    showMainMenu: function() {
        if (this.elements.mainMenu) {
            this.elements.mainMenu.style.display = 'flex';
        }
    }
};

// 导出全局对象（如果未使用模块化，则直接挂载到 window）
window.UI = UI;
