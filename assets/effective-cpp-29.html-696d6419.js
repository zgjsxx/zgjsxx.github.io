const n=JSON.parse('{"key":"v-081a83dd","path":"/posts/Program_language/cpp/effective-cpp/effective-cpp-29.html","title":"effective c++ 29 为异常安全而努力是值得的","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 29 为异常安全而努力是值得的 本节主要阐述了面对异常我们该做的事情。用数据库进行类比，数据库中有事务的概念，即要么都执行成功，要么都不执行。类比于异常，当异常发生时，我们最好要恢复到调用之前的状态。 分析 下面先看一个经典的错误案例： void lock(Mutex* pm); //锁定pm所指的互斥器 void unlock(Mutex* pm); //将互斥器解锁 class PrettyMenu { public: void changeBackground(std::istream&amp; imgSrc) { lock(&amp;mutex); //取得互斥器 delete bgImage; //删除旧图片 ++imageChanges; //修改图像更改次数 bgImage = new Image(imgSrc); //安装新的背景图片 unlock(&amp;mutex); //释放互斥器 } private: Mutex mutex; //互斥器 Image* bgImage; //目前使用的背景图片 int imageChanges;//图片被修改的次数 };","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp/effective-cpp-29.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 29 为异常安全而努力是值得的"}],["meta",{"property":"og:description","content":"effective c++ 29 为异常安全而努力是值得的 本节主要阐述了面对异常我们该做的事情。用数据库进行类比，数据库中有事务的概念，即要么都执行成功，要么都不执行。类比于异常，当异常发生时，我们最好要恢复到调用之前的状态。 分析 下面先看一个经典的错误案例： void lock(Mutex* pm); //锁定pm所指的互斥器 void unlock(Mutex* pm); //将互斥器解锁 class PrettyMenu { public: void changeBackground(std::istream&amp; imgSrc) { lock(&amp;mutex); //取得互斥器 delete bgImage; //删除旧图片 ++imageChanges; //修改图像更改次数 bgImage = new Image(imgSrc); //安装新的背景图片 unlock(&amp;mutex); //释放互斥器 } private: Mutex mutex; //互斥器 Image* bgImage; //目前使用的背景图片 int imageChanges;//图片被修改的次数 };"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T06:58:32.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-11T06:58:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 29 为异常安全而努力是值得的\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T06:58:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683788312000,"updatedTime":1683788312000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":5.11,"words":1534},"filePathRelative":"posts/Program_language/cpp/effective-cpp/effective-cpp-29.md","localizedDate":"2023年5月11日","excerpt":"<h1> effective c++ 29 为异常安全而努力是值得的</h1>\\n<p>本节主要阐述了面对异常我们该做的事情。用数据库进行类比，数据库中有事务的概念，即要么都执行成功，要么都不执行。类比于异常，当异常发生时，我们最好要恢复到调用之前的状态。</p>\\n<h2> 分析</h2>\\n<p>下面先看一个经典的错误案例：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">void</span> <span class=\\"token function\\">lock</span><span class=\\"token punctuation\\">(</span>Mutex<span class=\\"token operator\\">*</span> pm<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">//锁定pm所指的互斥器</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">unlock</span><span class=\\"token punctuation\\">(</span>Mutex<span class=\\"token operator\\">*</span> pm<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//将互斥器解锁</span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">PrettyMenu</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n    <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">changeBackground</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span>istream<span class=\\"token operator\\">&amp;</span> imgSrc<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">lock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>mutex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">//取得互斥器</span>\\n        <span class=\\"token keyword\\">delete</span> bgImage<span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//删除旧图片</span>\\n        <span class=\\"token operator\\">++</span>imageChanges<span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//修改图像更改次数</span>\\n        bgImage <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token function\\">Image</span><span class=\\"token punctuation\\">(</span>imgSrc<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//安装新的背景图片</span>\\n        <span class=\\"token function\\">unlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>mutex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//释放互斥器</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">private</span><span class=\\"token operator\\">:</span>\\n    Mutex mutex<span class=\\"token punctuation\\">;</span>     <span class=\\"token comment\\">//互斥器</span>\\n    Image<span class=\\"token operator\\">*</span> bgImage<span class=\\"token punctuation\\">;</span>  <span class=\\"token comment\\">//目前使用的背景图片</span>\\n    <span class=\\"token keyword\\">int</span> imageChanges<span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//图片被修改的次数</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
