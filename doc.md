Larry Lu
I am a developer and I love working with people.

About Me
分類文章
最新文章
© 2017. All rights reserved.




目前這個部落格是用 jekyll 架在 github page 上，但因為 jekyll 功能不多，所以決定把部落格遷移到 Medium 上，以後這邊就不會再發表新文章，歡迎大家到 Medium 上追蹤我～
[Node.js] 理解 Node.js 事件驅動
16 Jun 2016


這篇講的東西比較偏概念
所以文字敘述會多一點
希望大家可以有耐心的看完～

Async(非同步)
Node.js 是一個單執行緒且非同步的語言
非同步的 function 會被放進一個 event queue
等其他 code 跑完之後才會跑那個 event queue
如果 queue 裡面有很多事要做就會依序做
所以不會阻塞執行緒

setTimeout
Javascript 最簡單的 async 函式是 setTimeout
setTimeout 會在一定的時間之後執行某個函式
或說是在一定時間之後把那個函式放進 event queue
等其他事情都做完就會就會開始做 event queue 內的事情
來看看這一段 code

範例1
setTimeout(function(){
    console.log('callback');
}, 1000);

console.log('Hello World');
剛開始跑到 setTimeout
系統會設定在 1 秒之後把 function 要做的事放到 event queue
然後就繼續跑到下面輸出 “Hello World”
輸出結束之後這時候事情都做完了

等了一秒 function 被塞到 event queue
這時候沒有事情要做所以就開始跑 event queue 內的事情
然後就輸出 “callback”

範例2
setTimeout(function(){
    console.log('callback');
}, 1000);

while(true){
    var a = 1 * 2;
}
這個跟 範例1 不太一樣
先跑到 setTimeout
系統會設定在 1 秒之後把 function 要做的事放到 event queue
繼續往下跑到 while
一直算一些東西

等了一秒 function 被塞到 event queue
這時候因為一直有事情要做
所以雖然console.log('callback')已經被放到 event queue 
但永遠不會執行
因為程式要在做完主要的事情才會開始跑 event queue

Callback(回呼)
因為不知道 async 的那些工作什麼時候會完成
但我們又需要等那些工作做完之後才能做某些事情

譬如說如果要判斷一個檔案裡面有多少字元
要先讀檔案
接著再從讀到的字串計算有多少個字元
但偏偏讀檔案的函式是 async
這時候就需要 callback

範例1
讀檔案並計算長度

var fs = require('fs');

// fs.readFile(filename, callback(err, content))

fs.readFile('test.txt', function(err, content){
    var str = content.toString();
    console.log(str.length);
    console.log('finish');
});

console.log('not finish');
fs 是個 nodejs 的模組
可以用來讀檔案
跑到fs.readFile的時候
系統會把讀檔案這個任務放到 event queue
有空的時候就會去做
如果當下可以系統有空也有可能馬上讀

接著就繼續往下跑輸出not finish
因為不知道檔案什麼時候會讀完
所以我們把檔案讀完要做的事情放在 callback 裡面
雖然不知道什麼時候會讀完
但只要一讀完檔案就會做 callback 裡面的事情
計算那個檔案裡面有多少字元
然後輸出finish

範例2
讀完檔案在檔尾加上Hello World
再寫回去檔案

var fs = require('fs');

// fs.readFile(filename, callback(err, content))
// fs.writeFile(filename, content, callback(err))

fs.readFile('test.txt', function(err, content){
    var str = content.toString();
    str += 'Hello World';
    fs.writeFile('test.txt', str, function(err){
        console.log('finish');
    });
});

console.log('not finish');
用 callback 的方式可以一直疊一直疊
讀完檔案之後在尾巴加上Hello World
之後再寫入檔案
但寫入檔案也是 async
所以也要設定一個 callback
寫入完成之後再輸出not finish

範例3
在 callback 內檢查錯誤

var fs = require('fs');

fs.readFile('test.txt', function(err, content){
    if(err) console.log(err);

    var str = content.toString();
    str += 'Hello World';
});
callback 內通常都會有一個err傳回
如果不是null或undefined代表處理過程中有發生錯誤
譬如說要讀取test.txt這個檔案
結果根本沒有這個檔案
那就會發生錯誤
用 callback 一定要檢查錯誤
如果有錯誤繼續做下去可能會發生非預期的結果

自己寫一個 async function
我們也可以把一些 async 的動作包起來
自己寫一個 async function
然後定義一個 callback

範例
寫一個函式叫做 append
功能是在某個檔案後面加上某個字串
因為 append 需要讀檔寫檔
所以一定也是個 async 函式

prototype 可能長這樣
append(filename, str, callback(err))

var append = function(filename, str, callback){
    fs.readFile(filename, function(err1, content){
        if(err1) console.log(err1);
        
        var newContent = content.toString() + str;
        fs.writeFile(filename, newContent, function(err2){
            if(err2) console.log(err2);

            callback(err1 || err2);
        });
    });
};

append('text.txt', 'Hello World', function(err){
    if(err) console.log(err);
    console.log('finish');
});
在append內剛開始先讀檔接著寫檔
等讀寫都完成之後就呼叫 callback
這樣就會跑使用者定義的 callback function

寫完之後就可以直接像下面這樣用
然後給一個 callback function
在append都完成之後就會跑 callback 然後輸出finish

Callback Hell(回呼地獄)
因為使用 callback 可能會一直往上疊
先進行 A 接著跑 B 然後 C, D 等等等
B 需要 A 的結果，C 需要 B 的結果
寫出來的 code 可能會長這樣

func1(function(err1, result1){
    if(err1){
        console.log(err1);
    } else {
        func2(result1, function(err2, result2, result3){
            if(err2){
                console.log(err2);
            } else {
                func3(result2, result3, function(err3, result4){
                    if(err3){
                        console.log(err3);
                    } else {
                        console.log(result4);
                    }
                });
            }
        });
    }
});
這樣的 code 還是對的
只是很醜很難 debug
可以用 async module 來改善
避免 code 越疊越高
可以參考這篇 async 介紹
不然也可以用 Promise
不過那比較難懂
建議完全理解 callback 再開始摸 Promise

總結
整個程式只有一個 event queue
async 的 function 都會被塞到 event queue
系統有空就開始跑 event queue
裡面的所有任務會輪流跑
跑完就呼叫 callback

Javascript 的 callback 機制跟其他語言不一樣
像 C++ / Java 都是一行一行跑(如果只有單執行緒)

但 js 因為有一堆 callback 常常不知道現在在跑哪一段 code
剛開始會覺得有點亂
但久了之後覺得還滿好用的
不用自己去確認某件事做完了沒
反正做完會有 callback

Node.js 的事件驅動機制介紹就到這裡
想看 async 的可以參考這一篇
如何用 async 控制流程

GitHub：@Larry850806
FaceBook 粉專：賴瑞的程式筆記
如果有新文章或是看到好的文章也會分享在粉專

Related Posts
[實用] 新一代的編輯器 - VSCode 17 Aug 2017
[React.js] 用 @decorator 來裝飾你的 Component 吧！ 08 Apr 2017
[實用] 終端機 session 管理神器 - tmux 14 Feb 2017
