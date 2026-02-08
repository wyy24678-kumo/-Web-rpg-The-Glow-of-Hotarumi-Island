/**
 * main.js - 核心逻辑入口
 * 负责初始化游戏、加载数据及管理游戏循环。
 */

const Game = {
    // 游戏状态
    state: {
        isInitialized: false,
        isPlaying: false
    },

    // 初始化游戏
    init: function() {
        console.log("Game: 核心逻辑初始化...");
        this.state.isInitialized = true;

        // 初始化 UI，并传入回调函数
        if (window.UI) {
            window.UI.initMainMenu(this.startNewGame, this.loadGame);
        } else {
            console.error("Game: UI 模块未加载！");
        }
    },

    // 开始新游戏流程
    startNewGame: function() {
        console.log("Game: 触发【开始旅途】流程...");
        // 跳转到游戏主页面
        window.location.href = 'game.html';
    },

    // 加载存档流程
    loadGame: function() {
        console.log("Game: 触发【继续旅途】流程...");
        // 暂时同样跳转到游戏页面，后续可添加参数如 game.html?load=true
        window.location.href = 'game.html';
    }
};

// 页面加载完成后启动游戏
window.addEventListener('load', () => {
    Game.init();
});
