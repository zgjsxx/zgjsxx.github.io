const n=JSON.parse('{"key":"v-dc094c8c","path":"/posts/Program_language/cpp/cpp_memory_order.html","title":"c++原子变量中的内存序","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"c++原子变量中的内存序 关于内存序，我们从下面这个例子看起，线程1首先设置a = 1, 再将c设置为3。 线程2判断c是否等于3， 等于3之后，则打印a是否等于1。 于是有人说，问这个问题，不是傻子吗，肯定等于1啊。然而事实是这样吗？我们使用-O3进行编译。 //g++ main.cpp -O3 #include &lt;thread&gt; #include &lt;iostream&gt; int a = 0, c = 0; void func1() { a = 1; c = 3; } void func2() { while(c != 3); std::cout &lt;&lt; (a == 1) &lt;&lt; std::endl; } int main() { std::thread th1(func1); std::thread th2(func2); th1.join(); th2.join(); }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_memory_order.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++原子变量中的内存序"}],["meta",{"property":"og:description","content":"c++原子变量中的内存序 关于内存序，我们从下面这个例子看起，线程1首先设置a = 1, 再将c设置为3。 线程2判断c是否等于3， 等于3之后，则打印a是否等于1。 于是有人说，问这个问题，不是傻子吗，肯定等于1啊。然而事实是这样吗？我们使用-O3进行编译。 //g++ main.cpp -O3 #include &lt;thread&gt; #include &lt;iostream&gt; int a = 0, c = 0; void func1() { a = 1; c = 3; } void func2() { while(c != 3); std::cout &lt;&lt; (a == 1) &lt;&lt; std::endl; } int main() { std::thread th1(func1); std::thread th2(func2); th1.join(); th2.join(); }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-14T09:50:44.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-06-14T09:50:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++原子变量中的内存序\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-14T09:50:44.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1684907446000,"updatedTime":1686736244000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":2.32,"words":697},"filePathRelative":"posts/Program_language/cpp/cpp_memory_order.md","localizedDate":"2023年5月24日","excerpt":"<h1> c++原子变量中的内存序</h1>\\n<p>关于内存序，我们从下面这个例子看起，线程1首先设置a = 1, 再将c设置为3。 线程2判断c是否等于3， 等于3之后，则打印a是否等于1。</p>\\n<p>于是有人说，问这个问题，不是傻子吗，肯定等于1啊。然而事实是这样吗？我们使用<code>-O3</code>进行编译。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token comment\\">//g++ main.cpp -O3</span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;thread&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n\\n<span class=\\"token keyword\\">int</span> a <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> c <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">func1</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    a <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n    c <span class=\\"token operator\\">=</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">func2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">while</span><span class=\\"token punctuation\\">(</span>c <span class=\\"token operator\\">!=</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token punctuation\\">(</span>a <span class=\\"token operator\\">==</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>thread <span class=\\"token function\\">th1</span><span class=\\"token punctuation\\">(</span>func1<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>thread <span class=\\"token function\\">th2</span><span class=\\"token punctuation\\">(</span>func2<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    th1<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">join</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    th2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">join</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
