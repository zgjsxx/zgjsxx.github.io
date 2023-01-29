import{_ as e,V as p,W as o,X as s,Y as n,Z as c,a1 as a,F as l}from"./framework-d934f75f.js";const i={},u=a(`<h1 id="new-operator" tabindex="-1"><a class="header-anchor" href="#new-operator" aria-hidden="true">#</a> new operator</h1><p>当我们使用了new关键字去创建一个对象时，你知道背后做了哪些事情吗？</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>A<span class="token operator">*</span> a <span class="token operator">=</span> <span class="token keyword">new</span> A<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实际上这样简单的一行语句， 背后做了以下三件事情：</p><ol><li>分配内存,如果类A重载了operator new，那么将调用A::operator new(size_t )来完成，如果没有重载，就调用::operator new(size_t )，即全局new操作符来完成</li><li>调用构造函数生成类对象；</li><li>返回相应指针。</li></ol><p>下面我们通过一个例子来验证这个过程：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;malloc.h&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token comment">//student class</span>
<span class="token keyword">class</span> <span class="token class-name">Stu</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Stu</span><span class="token punctuation">(</span>string name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;call Stu class constructor&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span> 
        name_ <span class="token operator">=</span> name<span class="token punctuation">;</span>
        age_ <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;name = &quot;</span> <span class="token operator">&lt;&lt;</span> name_ <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        cout<span class="token operator">&lt;&lt;</span> <span class="token string">&quot;age = &quot;</span> <span class="token operator">&lt;&lt;</span> age_ <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>size_t size<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;call operator new&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">malloc</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    string name_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> age_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Stu<span class="token operator">*</span> stu1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Stu</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们重载了Stu类的operator new操作符，用来验证上述的结论。</p><p>上述代码的执行结果如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>call operator new
call Stu class constructor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到重载的operator new被调用，类A的构造函数也被调用，验证了上述的描述。</p><p>要注意到的是new是一个关键字，和sizeof一样，我们不能修改其具体功能。</p><h1 id="operator-new" tabindex="-1"><a class="header-anchor" href="#operator-new" aria-hidden="true">#</a> operator new</h1><p>从new的调用过程中，我们知道会调用operator new操作符</p><p>那么operator new又是什么呢？</p><p>C++支持运算符的重载，支持对一些运算符自定义其行为：</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/cplusplus/operator.jpg" alt="operator new" tabindex="0" loading="lazy"><figcaption>operator new</figcaption></figure><p>operator new是一个操作符，和+ -操作符一样，作用是分配空间。我们可以重写它们，修改分配空间的方式。</p><p>operator new返回值必须是void*。第一个参数必须是size_t</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span> <span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>bad_alloc<span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span> <span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">,</span> <span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>nothrow_t<span class="token operator">&amp;</span> nothrow_constant<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的例子中，我们使用重载了三个operator new方法， 并分别调用。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;malloc.h&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token comment">//student class</span>
<span class="token keyword">class</span> <span class="token class-name">Stu</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Stu</span><span class="token punctuation">(</span>string name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;call Stu class constructor&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span> 
        name_ <span class="token operator">=</span> name<span class="token punctuation">;</span>
        age_ <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;name = &quot;</span> <span class="token operator">&lt;&lt;</span> name_ <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        cout<span class="token operator">&lt;&lt;</span> <span class="token string">&quot;age = &quot;</span> <span class="token operator">&lt;&lt;</span> age_ <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>size_t size<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;call operator new&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">malloc</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>size_t size<span class="token punctuation">,</span> <span class="token keyword">int</span> num<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;call operator new with int&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">malloc</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 
    <span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>size_t size<span class="token punctuation">,</span> <span class="token keyword">char</span> c<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;call operator new with char&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">malloc</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>      
<span class="token keyword">private</span><span class="token operator">:</span>
    string name_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> age_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Stu<span class="token operator">*</span> stu1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Stu</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Stu<span class="token operator">*</span> stu2 <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token function">Stu</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Stu<span class="token operator">*</span> stu3 <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">(</span><span class="token char">&#39;c&#39;</span><span class="token punctuation">)</span> <span class="token function">Stu</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>call operator new
call Stu class constructor
call operator new with int
call Stu class constructor
call operator new with char
call Stu class constructor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="placement-new" tabindex="-1"><a class="header-anchor" href="#placement-new" aria-hidden="true">#</a> placement new</h1><p>placement new是operator new的一种重载形式， 起作用是可以在指定的内存地址创建对象。</p><p>placement new返回值必须是void*。第一个参数必须是size_t， 第二个参数是void*</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span> <span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">,</span> <span class="token keyword">void</span><span class="token operator">*</span> ptr<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面的是一个关于placement new的调用例子:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;malloc.h&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token comment">//student class</span>
<span class="token keyword">class</span> <span class="token class-name">Stu</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Stu</span><span class="token punctuation">(</span>string name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        name_ <span class="token operator">=</span> name<span class="token punctuation">;</span>
        age_ <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;name = &quot;</span> <span class="token operator">&lt;&lt;</span> name_ <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        cout<span class="token operator">&lt;&lt;</span> <span class="token string">&quot;age = &quot;</span> <span class="token operator">&lt;&lt;</span> age_ <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>size_t size<span class="token punctuation">,</span> <span class="token keyword">void</span><span class="token operator">*</span> p<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;placement new&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> p<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>    
<span class="token keyword">private</span><span class="token operator">:</span>
    string name_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> age_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">void</span><span class="token operator">*</span> stu1 <span class="token operator">=</span> <span class="token punctuation">(</span>Stu<span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>Stu<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">new</span> <span class="token punctuation">(</span>stu1<span class="token punctuation">)</span> <span class="token function">Stu</span><span class="token punctuation">(</span><span class="token string">&quot;stu1&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">(</span><span class="token punctuation">(</span>Stu<span class="token operator">*</span><span class="token punctuation">)</span>stu1<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>placement new
name = stu1
age = 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于placement new可以在一个指定的位置创建对象，因此在STL中有很广泛的运用， 例子vector容器初始化的时候，会使用allocator申请一定的内存，当使用push_back放入对象时， 就可以使用placement new在申请的位置创建对象。</p>`,33),r={href:"https://github.com/Alinshans/MyTinySTL/blob/master/MyTinySTL/construct.h",target:"_blank",rel:"noopener noreferrer"},d=a(`<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">Ty</span><span class="token punctuation">,</span> <span class="token keyword">class</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">construct</span><span class="token punctuation">(</span>Ty<span class="token operator">*</span> ptr<span class="token punctuation">,</span> Args<span class="token operator">&amp;&amp;</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token double-colon punctuation">::</span><span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span>ptr<span class="token punctuation">)</span> <span class="token function">Ty</span><span class="token punctuation">(</span>mystl<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">forward</span><span class="token generic class-name"><span class="token operator">&lt;</span>Args<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h1><p>对于new， operator new 和 placement new三者的区别， 我们总结如下：</p><p><strong>new</strong>：</p><p>new是一个关键字，不能被重载。它先调用operator new分配内存，然后调用构造函数初始化那段内存。</p><p>new 操作符的执行过程：</p><ol><li>调用operator new分配内存 ；</li><li>调用构造函数生成类对象；</li><li>返回相应指针。</li></ol><p><strong>operator new</strong>：</p><p>operator new就像operator + 一样，是可以重载的。如果类中没有重载operator new，那么调用的就是全局的::operator new来完成堆的分配。同理，operator new[]、operator delete、operator delete[]也是可以重载的。</p><p><strong>placement new</strong>：</p><p>只是operator new重载的一个版本。它并不分配内存，只是返回指向已经分配好的某段内存的一个指针。因此不能删除它，但需要调用对象的析构函数。</p><p>如果你想在<strong>已经分配的内存</strong>中创建一个对象，使用new时行不通的。也就是说placement new允许你在一个已经分配好的内存中（栈或者堆中）构造一个新的对象。原型中void* p实际上就是指向一个已经分配好的内存缓冲区的的首地址。</p>`,12);function k(v,m){const t=l("ExternalLinkIcon");return p(),o("div",null,[u,s("p",null,[n("这里以MyTinySTL中创建对象的函数为例，"),s("a",r,[n("construct.h"),c(t)]),n("， 可以看出construct函数就是使用了全局的placement new方法在指定地址创建对象。")]),d])}const w=e(i,[["render",k],["__file","placement_operator_new.html.vue"]]);export{w as default};
