import{_ as t,V as p,W as e,X as n,Y as o,$ as c,a0 as s,F as l}from"./framework-9a29aaa0.js";const i={},u=s(`<h1 id="深入理解c-特殊成员函数" tabindex="-1"><a class="header-anchor" href="#深入理解c-特殊成员函数" aria-hidden="true">#</a> 深入理解c++特殊成员函数</h1><p>在c++中，特殊成员函数有下面6个：</p><ul><li>构造函数</li><li>析构函数</li><li>复制构造函数(拷贝构造函数)</li><li>赋值运算符(拷贝运算符)</li><li>移动构造函数(c++11引入)</li><li>移动运算符(c++11引入)</li></ul><p>以Widget类为例，其特殊成员函数的签名如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Widget</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Widget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//构造函数</span>
    <span class="token operator">~</span><span class="token function">Widget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//析构函数</span>
    <span class="token function">Widget</span><span class="token punctuation">(</span><span class="token keyword">const</span> Widget<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//复制构造函数(拷贝构造函数)</span>
    Widget<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Widget<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//赋值运算符(拷贝运算符)</span>
    <span class="token function">Widget</span><span class="token punctuation">(</span>Widget<span class="token operator">&amp;&amp;</span> rhs<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//移动构造函数</span>
    Widget<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span>Widget<span class="token operator">&amp;&amp;</span> rhs<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//移动运算符</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个方法都有哪些作用，又都有哪些注意点？</p><p>本文将针对这些方法，进行详细的讲解。</p><h2 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h2><p>构造函数的作用是帮助<strong>创建对象的实例</strong>，并对实例进行初始化。</p><p>在c++中，下面两种形式的语句将会调用类的构造函数:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>Widget widget<span class="token punctuation">;</span>
Widget <span class="token operator">*</span>w <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Widget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>调用构造函数将会创建一个类的实例对象。当一个类拥有数据成员时，就需要为该类编写构造函数，在构造函数中对数据成员进行初始化。</p><p>对于c++98，如果一个类没有set方法，那么就需要为其创建含参数的构造函数，如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Widget</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Widget</span><span class="token punctuation">(</span><span class="token keyword">int</span> width<span class="token punctuation">,</span> <span class="token keyword">int</span> height<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">height_</span><span class="token punctuation">(</span>height<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">width_</span><span class="token punctuation">(</span>width<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> height_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> width_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Widget <span class="token function">w</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>倘若此时不为其创建含参数的构造函数，那么此时创建的对象中的成员的值是随机的，显而易见，这样的创建出的对象是不好的。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Widget</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">int</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> height_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">int</span> <span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> width_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> height_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> width_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Widget w<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> w<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&lt;&lt;</span>std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> w<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&lt;&lt;</span>std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>   
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是对于c++11之后的标准，成员的初始值可以在类中定义。</p><p>在这种场景下，所有该类创建出的对象将拥有相同的初始值。如果你希望创建出的对象的初始值可以是不相同的，那么还是需要添加含参数的构造函数。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Widget</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">int</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> height_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">int</span> <span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> width_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> height_<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> width_<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Widget w<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> w<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&lt;&lt;</span>std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> w<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&lt;&lt;</span>std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>   
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="析构函数" tabindex="-1"><a class="header-anchor" href="#析构函数" aria-hidden="true">#</a> 析构函数</h2><p>构造函数的作用是帮助<strong>销毁一个实例</strong>。</p><p>这很好理解，但是合适需要自定义析构函数呢？</p><p>首先看下面这个类，这个类需要写自定义析构函数吗？</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Student</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>string name <span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">name_</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">age_</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">id</span><span class="token punctuation">(</span>id_<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>；
    <span class="token comment">//需要析构函数吗？</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    std<span class="token double-colon punctuation">::</span>string <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> age_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> id_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    std<span class="token double-colon punctuation">::</span>string name_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> age_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> id_<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答案是否定的，这个Student类只包含了三个成员，默认的析构函数会清理掉这些数据，因此不需要自定义析构函数。</p><p>再看看下面这个例子，需要为其自定义析构函数吗？</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Student</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> s <span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>size_t n<span class="token punctuation">)</span> ：<span class="token function">name_</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">{</span>
        <span class="token function">memcpy</span><span class="token punctuation">(</span>name_<span class="token punctuation">,</span> s<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//需要析构函数吗？</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> name_<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很显然，该类需要自定义析构函数。默认的析构函数只会将name_置为nullptr，而不会释放new所创建的内存空间。</p><p>因此上面的例子需要改造为下面这样的形式：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Student</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> s <span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>size_t n<span class="token punctuation">)</span> ：<span class="token function">name_</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">{</span>
        <span class="token function">memcpy</span><span class="token punctuation">(</span>name_<span class="token punctuation">,</span> s<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>name_<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> name_<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//需要析构函数吗？</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> name_<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实这个类到目前为止还是有问题的，在下文中会解释为什么。</p><p>再看看下面这个例子，需要为其自定义析构函数吗？</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">AsyncExec</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">exec</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>function<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&gt;</span><span class="token operator">&amp;</span> func<span class="token punctuation">)</span><span class="token punctuation">{</span>
        threadPtr_ <span class="token operator">=</span> <span class="token keyword">new</span> std<span class="token double-colon punctuation">::</span><span class="token function">thread</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//需要析构函数吗？</span>
<span class="token keyword">private</span>：
    std<span class="token double-colon punctuation">::</span>thread<span class="token operator">*</span> threadPtr_<span class="token punctuation">{</span><span class="token keyword">nullptr</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很显然，该类也需要自定义析构函数。AsyncExec类的实例在调用完Exec方法后,其内部包含了一个指针，并且其成员是<code>std::thread</code>类型的指针，如果其没有被detach，那么就必须要进行join，否则将会terminate程序。</p><p>因此上面的例子需要改造为下面这样的形式：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">AsyncExec</span><span class="token punctuation">{</span>
<span class="token keyword">public</span>
    <span class="token operator">~</span><span class="token function">AsyncExec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>threadPtr<span class="token punctuation">)</span><span class="token punctuation">{</span>
            threadPtr<span class="token operator">-&gt;</span>join<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">delete</span> threadPtr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">exec</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>function<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&gt;</span><span class="token operator">&amp;</span> func<span class="token punctuation">)</span><span class="token punctuation">{</span>
        threadPtr_ <span class="token operator">=</span> <span class="token keyword">new</span> std<span class="token double-colon punctuation">::</span><span class="token function">thread</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//需要析构函数吗？</span>
<span class="token keyword">private</span>：
    std<span class="token double-colon punctuation">::</span>thread<span class="token operator">*</span> threadPtr_<span class="token punctuation">{</span><span class="token keyword">nullptr</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面两个例子，也基本可以发现这样的规律：</p><p>通常一个类需要<strong>管理一些资源时</strong>(原始指针，线程，文件描述符等)，通常需要为其编写自定义的析构函数，因为此时的默认的析构函数的行为是不正确的。</p><p>接下来需要了解一个著名的<strong>rule of three定理</strong>，如果一个类需要用户定义的析构函数、用户定义的复制构造函数或用户定义的复制赋值运算符三者中的一个，那么它几乎肯定需要这三个函数。</p><p>例如下面的例子</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstdint&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstring&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Student</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> s <span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>size_t n<span class="token punctuation">)</span> <span class="token operator">:</span><span class="token function">name_</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">memcpy</span><span class="token punctuation">(</span>name_<span class="token punctuation">,</span> s<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">explicit</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> s <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token function">Student</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span><span class="token function">strlen</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>name_<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> name_<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> name_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Student <span class="token function">s1</span><span class="token punctuation">(</span><span class="token string">&quot;shirley&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Student <span class="token function">s2</span><span class="token punctuation">(</span><span class="token string">&quot;tom&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    Student <span class="token function">s3</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//(1)</span>
    s2 <span class="token operator">=</span> s1<span class="token punctuation">;</span><span class="token comment">//（2）</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用默认的复制构造函数，将会出现double free的错误。此时s1和s3的name_成员指向同一处内存，s1和s3析构时将重复析构。</p><p>如果使用默认的赋值运算符，不仅会有double free的问题，还会有一处内存泄漏。由于s2被赋值为了s1，因此s2原来的name_指向的内存将不再有指针指向，于是产生了内存泄漏。接下来，同理s1和s2的name_成员指向同一处内存，s1和s2析构时将重复析构。</p><p>正确的写法就是在添加自定义析构函数的同时，为其添加自定义的赋值构造函数和自定义的赋值运算符。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstdint&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstring&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Student</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> s <span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>size_t n<span class="token punctuation">)</span> <span class="token operator">:</span><span class="token function">name_</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">memcpy</span><span class="token punctuation">(</span>name_<span class="token punctuation">,</span> s<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">explicit</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> s <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token function">Student</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span><span class="token function">strlen</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>name_<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> name_<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">Student</span><span class="token punctuation">(</span><span class="token keyword">const</span> Student<span class="token operator">&amp;</span> other<span class="token punctuation">)</span> <span class="token comment">// II. copy constructor</span>
        <span class="token operator">:</span> <span class="token function">Student</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>name_<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
 
    Student<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Student<span class="token operator">&amp;</span> other<span class="token punctuation">)</span> <span class="token comment">// III. copy assignment</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> <span class="token operator">&amp;</span>other<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
 
        std<span class="token double-colon punctuation">::</span>size_t n<span class="token punctuation">{</span>std<span class="token double-colon punctuation">::</span><span class="token function">strlen</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>name_<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">char</span><span class="token operator">*</span> new_cstring <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>            <span class="token comment">// allocate</span>
        std<span class="token double-colon punctuation">::</span><span class="token function">memcpy</span><span class="token punctuation">(</span>new_cstring<span class="token punctuation">,</span> other<span class="token punctuation">.</span>name_<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// populate</span>
        <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> name_<span class="token punctuation">;</span>                           <span class="token comment">// deallocate</span>
        name_ <span class="token operator">=</span> new_cstring<span class="token punctuation">;</span>
 
        <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> name_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Student <span class="token function">s1</span><span class="token punctuation">(</span><span class="token string">&quot;shirley&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Student <span class="token function">s2</span><span class="token punctuation">(</span><span class="token string">&quot;tom&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    Student <span class="token function">s3</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    s2 <span class="token operator">=</span> s1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>赋值运算符中的这段代码的写法，在effective c++中有提到，这样做是为了保证<strong>异常安全性</strong>，这样的写法可以确保new的失败的情况下，不会对原有对象的数据进行破坏。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>    std<span class="token double-colon punctuation">::</span>size_t n<span class="token punctuation">{</span>std<span class="token double-colon punctuation">::</span><span class="token function">strlen</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>name_<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token operator">*</span> new_cstring <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>            <span class="token comment">// allocate</span>
    std<span class="token double-colon punctuation">::</span><span class="token function">memcpy</span><span class="token punctuation">(</span>new_cstring<span class="token punctuation">,</span> other<span class="token punctuation">.</span>name_<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// populate</span>
    <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> name_<span class="token punctuation">;</span>                           <span class="token comment">// deallocate</span>
    name_ <span class="token operator">=</span> new_cstring<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复制构造函数和赋值运算符" tabindex="-1"><a class="header-anchor" href="#复制构造函数和赋值运算符" aria-hidden="true">#</a> 复制构造函数和赋值运算符</h2><p>复制构造函数的作用是<strong>使用一个已经存在的对象去创建一个新的对象</strong>。</p><p>赋值运算符的作用是将原有对象的所有成员变量赋值给一个已经创建的对象。</p><p>二者的区别在于一个是<strong>创建一个新对象</strong>，一个是<strong>赋值给一个已经存在的对象</strong>。</p><p>在下面的例子中，语法（1）就是调用复制构造函数， 语法（2）就是调用赋值运算符。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token punctuation">{</span>
    Student <span class="token function">s1</span><span class="token punctuation">(</span><span class="token string">&quot;shirley&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Student <span class="token function">s2</span><span class="token punctuation">(</span><span class="token string">&quot;tom&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    Student <span class="token function">s3</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//(1)复制构造函数</span>
    s2 <span class="token operator">=</span> s1<span class="token punctuation">;</span><span class="token comment">//(2)赋值运算符</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们回顾下面提到的Student类，看下正确的复制构造函数和赋值运算符的编写需要注意什么。</p><p>复制构造函数的功能相对简单，主要是成员的复制，如果存在类管理的指针，则需要进行深拷贝。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token function">Student</span><span class="token punctuation">(</span><span class="token keyword">const</span> Student<span class="token operator">&amp;</span> other<span class="token punctuation">)</span> <span class="token comment">// II. copy constructor</span>
    <span class="token operator">:</span> <span class="token function">Student</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>name_<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>赋值运算符的编写的注意点相对较多。</p><p>首先要添加自我赋值判断。</p><p>其次由于赋值运算符是对一个已经存在的对象再次赋值，因此首先需要销毁原有对象的成员。</p><p>接着需要处理成员对象的赋值，如果存在类管理的指针，则需要进行深拷贝。</p><p>最后需要将<code>*this</code>进行返回，以便进行连续赋值。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>Student<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Student<span class="token operator">&amp;</span> other<span class="token punctuation">)</span> <span class="token comment">// III. copy assignment</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> <span class="token operator">&amp;</span>other<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>

    std<span class="token double-colon punctuation">::</span>size_t n<span class="token punctuation">{</span>std<span class="token double-colon punctuation">::</span><span class="token function">strlen</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>name_<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token operator">*</span> new_cstring <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>            <span class="token comment">// allocate</span>
    std<span class="token double-colon punctuation">::</span><span class="token function">memcpy</span><span class="token punctuation">(</span>new_cstring<span class="token punctuation">,</span> other<span class="token punctuation">.</span>name_<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// populate</span>
    <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> name_<span class="token punctuation">;</span>                           <span class="token comment">// deallocate</span>
    name_ <span class="token operator">=</span> new_cstring<span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你没有提供自定义的复制构造函数和赋值运算符时，编译器将创建默认的复制构造函数和赋值运算符，其将对成员进行<strong>浅拷贝</strong>。</p><p>如果你的类没有管理资源，那么浅拷贝可能是合适的。如果你的类是管理某些资源的（<strong>原始指针</strong>，<strong>线程对象</strong>，<strong>文件描述符</strong>等），那么大概率默认的复制构造函数和赋值运算符是不合适的。</p><p>但是要注意有时候，成员虽然有原始指针，但是并不代表该原始指针由该类管理。</p><p>例如下面的例子中，Client类中拥有handler_指针，但是该指针的生命周期并不由该类管理，该类仅仅是使用该指针，因此在这种场景下，浅拷贝就没有问题，默认的复制构造函数和赋值运算符就可以满足要求。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;functional&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thread&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;future&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">IHandler</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">IHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">IHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">TcpHandler</span>  <span class="token operator">:</span><span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IHandler</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">TcpHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">TcpHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;tcp connect&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">UdpHandler</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IHandler</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">UdpHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">UdpHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;udp connect&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Client</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Client</span><span class="token punctuation">(</span>IHandler<span class="token operator">*</span> handler<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">handler_</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token operator">~</span><span class="token function">Client</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        handler_<span class="token operator">-&gt;</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    IHandler<span class="token operator">*</span> handler_<span class="token punctuation">{</span><span class="token keyword">nullptr</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span>IHandler<span class="token operator">*</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>handler<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    Client <span class="token function">client</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    client<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    IHandler<span class="token operator">*</span> handler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">TcpHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">process</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">delete</span> handler<span class="token punctuation">;</span>
    handler <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
    handler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">UdpHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">process</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>   
    <span class="token keyword">delete</span> handler<span class="token punctuation">;</span>
    handler <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，在设计类的时候，需要注意类是否是管理资源还是仅仅是使用资源。如果是管理资源，那么大概率你需要自定义<strong>复制构造函数</strong>和<strong>赋值运算符</strong>。</p><p>这里再次会提到<strong>rule of three定理</strong>，通常情况下，如果你需要<strong>自定义析构函数</strong>的时候，大概率你就需要自定义<strong>复制构造函数</strong>和<strong>赋值运算符</strong>。</p><p>牢记这个点，当你在设计一个类时需要有这样的条件反射。</p><p>其实如果当你自定义了析构函数之后，默认的<strong>复制构造函数</strong>和<strong>赋值运算符</strong>就可以被delete，但是在c++98年代，这个点还没有被重视。到了c++11年代，因为考虑到旧代码的迁移困难，这个点还是没有继续支持。编译器选择对新支持的移动构造函数和移动运算符支持这个点上的考虑，即如果定义了析构函数，则默认的移动构造函数和移动运算符将会delete，这个点在下面还会继续讲解。</p><h2 id="移动构造函数和移动运算符" tabindex="-1"><a class="header-anchor" href="#移动构造函数和移动运算符" aria-hidden="true">#</a> 移动构造函数和移动运算符</h2><p>移动语义在c++11之后大面积使用，它允许将一个对象的所有权从一个对象转移到另一个对象，而不需要进行数据的拷贝。 这种转移可以在对象生命周期的任意时刻进行，可以说是一种轻量级的复制操作。</p><p>而移动构造函数和移动运算符就是在类中支持移动语义的二个方法。</p><p>关于如何书写移动构造函数和移动运算符，这里参考微软的文档进行理解。</p>`,75),r={href:"https://learn.microsoft.com/zh-cn/cpp/cpp/move-constructors-and-move-assignment-operators-cpp?view=msvc-170",target:"_blank",rel:"noopener noreferrer"},d=s(`<p>下面的例子是用于管理内存缓冲区的 C++ 类 MemoryBlock。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// MemoryBlock.h</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression">once</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;algorithm&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">MemoryBlock</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>

   <span class="token comment">// Simple constructor that initializes the resource.</span>
   <span class="token keyword">explicit</span> <span class="token function">MemoryBlock</span><span class="token punctuation">(</span>size_t length<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">_length</span><span class="token punctuation">(</span>length<span class="token punctuation">)</span>
      <span class="token punctuation">,</span> <span class="token function">_data</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In MemoryBlock(size_t). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> _length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Destructor.</span>
   <span class="token operator">~</span><span class="token function">MemoryBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In ~MemoryBlock(). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> _length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>_data <span class="token operator">!=</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; Deleting resource.&quot;</span><span class="token punctuation">;</span>
         <span class="token comment">// Delete the resource.</span>
         <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> _data<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Copy constructor.</span>
   <span class="token function">MemoryBlock</span><span class="token punctuation">(</span><span class="token keyword">const</span> MemoryBlock<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">_length</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>_length<span class="token punctuation">)</span>
      <span class="token punctuation">,</span> <span class="token function">_data</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>other<span class="token punctuation">.</span>_length<span class="token punctuation">]</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In MemoryBlock(const MemoryBlock&amp;). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> other<span class="token punctuation">.</span>_length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;. Copying resource.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

      std<span class="token double-colon punctuation">::</span><span class="token function">copy</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>_data<span class="token punctuation">,</span> other<span class="token punctuation">.</span>_data <span class="token operator">+</span> _length<span class="token punctuation">,</span> _data<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Copy assignment operator.</span>
   MemoryBlock<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> MemoryBlock<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In operator=(const MemoryBlock&amp;). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> other<span class="token punctuation">.</span>_length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;. Copying resource.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">!=</span> <span class="token operator">&amp;</span>other<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token comment">// Free the existing resource.</span>
         <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> _data<span class="token punctuation">;</span>

         _length <span class="token operator">=</span> other<span class="token punctuation">.</span>_length<span class="token punctuation">;</span>
         _data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>_length<span class="token punctuation">]</span><span class="token punctuation">;</span>
         std<span class="token double-colon punctuation">::</span><span class="token function">copy</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>_data<span class="token punctuation">,</span> other<span class="token punctuation">.</span>_data <span class="token operator">+</span> _length<span class="token punctuation">,</span> _data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Retrieves the length of the data resource.</span>
   size_t <span class="token function">Length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
   <span class="token punctuation">{</span>
      <span class="token keyword">return</span> _length<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
   size_t _length<span class="token punctuation">;</span> <span class="token comment">// The length of the resource.</span>
   <span class="token keyword">int</span><span class="token operator">*</span> _data<span class="token punctuation">;</span> <span class="token comment">// The resource.</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为MemoryBlock创建移动构造函数</strong></p><ul><li>1.定义一个空的构造函数方法，该方法采用一个对类类型的右值引用作为参数，如以下示例所示：</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token function">MemoryBlock</span><span class="token punctuation">(</span>MemoryBlock<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span>
   <span class="token operator">:</span> <span class="token function">_data</span><span class="token punctuation">(</span><span class="token keyword">nullptr</span><span class="token punctuation">)</span>
   <span class="token punctuation">,</span> <span class="token function">_length</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>2.在移动构造函数中，将源对象中的类数据成员添加到要构造的对象：</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>_data <span class="token operator">=</span> other<span class="token punctuation">.</span>_data<span class="token punctuation">;</span>
_length <span class="token operator">=</span> other<span class="token punctuation">.</span>_length<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>3.将源对象的数据成员分配给默认值。 这可以防止析构函数多次释放资源（如内存）:</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>other<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
other<span class="token punctuation">.</span>_length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为MemoryBloc类创建移动赋值运算符</strong></p><ul><li>1.定义一个空的赋值运算符，该运算符采用一个对类类型的右值引用作为参数并返回一个对类类型的引用，如以下示例所示：</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>MemoryBlock<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span>MemoryBlock<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>2.在移动赋值运算符中，如果尝试将对象赋给自身，则添加不执行运算的条件语句。</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">!=</span> <span class="token operator">&amp;</span>other<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>3.在条件语句中，从要将其赋值的对象中释放所有资源（如内存）。</li></ul><p>以下示例从要将其赋值的对象中释放 _data 成员：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// Free the existing resource.</span>
<span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> _data<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>4.执行第一个过程中的步骤 2 和步骤 3 以将数据成员从源对象转移到要构造的对象：</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// Copy the data pointer and its length from the</span>
<span class="token comment">// source object.</span>
_data <span class="token operator">=</span> other<span class="token punctuation">.</span>_data<span class="token punctuation">;</span>
_length <span class="token operator">=</span> other<span class="token punctuation">.</span>_length<span class="token punctuation">;</span>

<span class="token comment">// Release the data pointer from the source object so that</span>
<span class="token comment">// the destructor does not free the memory multiple times.</span>
other<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
other<span class="token punctuation">.</span>_length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>5.返回对当前对象的引用，如以下示例所示：</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完整的MemoryBlock类如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;algorithm&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">MemoryBlock</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>

   <span class="token comment">// Simple constructor that initializes the resource.</span>
   <span class="token keyword">explicit</span> <span class="token function">MemoryBlock</span><span class="token punctuation">(</span>size_t length<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">_length</span><span class="token punctuation">(</span>length<span class="token punctuation">)</span>
      <span class="token punctuation">,</span> <span class="token function">_data</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In MemoryBlock(size_t). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> _length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Destructor.</span>
   <span class="token operator">~</span><span class="token function">MemoryBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In ~MemoryBlock(). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> _length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>_data <span class="token operator">!=</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; Deleting resource.&quot;</span><span class="token punctuation">;</span>
         <span class="token comment">// Delete the resource.</span>
         <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> _data<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Copy constructor.</span>
   <span class="token function">MemoryBlock</span><span class="token punctuation">(</span><span class="token keyword">const</span> MemoryBlock<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">_length</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>_length<span class="token punctuation">)</span>
      <span class="token punctuation">,</span> <span class="token function">_data</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>other<span class="token punctuation">.</span>_length<span class="token punctuation">]</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In MemoryBlock(const MemoryBlock&amp;). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> other<span class="token punctuation">.</span>_length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;. Copying resource.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

      std<span class="token double-colon punctuation">::</span><span class="token function">copy</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>_data<span class="token punctuation">,</span> other<span class="token punctuation">.</span>_data <span class="token operator">+</span> _length<span class="token punctuation">,</span> _data<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Copy assignment operator.</span>
   MemoryBlock<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> MemoryBlock<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In operator=(const MemoryBlock&amp;). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> other<span class="token punctuation">.</span>_length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;. Copying resource.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">!=</span> <span class="token operator">&amp;</span>other<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token comment">// Free the existing resource.</span>
         <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> _data<span class="token punctuation">;</span>

         _length <span class="token operator">=</span> other<span class="token punctuation">.</span>_length<span class="token punctuation">;</span>
         _data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>_length<span class="token punctuation">]</span><span class="token punctuation">;</span>
         std<span class="token double-colon punctuation">::</span><span class="token function">copy</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>_data<span class="token punctuation">,</span> other<span class="token punctuation">.</span>_data <span class="token operator">+</span> _length<span class="token punctuation">,</span> _data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
    <span class="token comment">// Move constructor.</span>
    <span class="token function">MemoryBlock</span><span class="token punctuation">(</span>MemoryBlock<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span> <span class="token keyword">noexcept</span>
    <span class="token operator">:</span> <span class="token function">_data</span><span class="token punctuation">(</span><span class="token keyword">nullptr</span><span class="token punctuation">)</span>
    <span class="token punctuation">,</span> <span class="token function">_length</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In MemoryBlock(MemoryBlock&amp;&amp;). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> other<span class="token punctuation">.</span>_length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;. Moving resource.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

    <span class="token comment">// Copy the data pointer and its length from the</span>
    <span class="token comment">// source object.</span>
    _data <span class="token operator">=</span> other<span class="token punctuation">.</span>_data<span class="token punctuation">;</span>
    _length <span class="token operator">=</span> other<span class="token punctuation">.</span>_length<span class="token punctuation">;</span>

    <span class="token comment">// Release the data pointer from the source object so that</span>
    <span class="token comment">// the destructor does not free the memory multiple times.</span>
    other<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
    other<span class="token punctuation">.</span>_length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Move assignment operator.</span>
    MemoryBlock<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span>MemoryBlock<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span> <span class="token keyword">noexcept</span>
    <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In operator=(MemoryBlock&amp;&amp;). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> other<span class="token punctuation">.</span>_length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">!=</span> <span class="token operator">&amp;</span>other<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Free the existing resource.</span>
        <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> _data<span class="token punctuation">;</span>

        <span class="token comment">// Copy the data pointer and its length from the</span>
        <span class="token comment">// source object.</span>
        _data <span class="token operator">=</span> other<span class="token punctuation">.</span>_data<span class="token punctuation">;</span>
        _length <span class="token operator">=</span> other<span class="token punctuation">.</span>_length<span class="token punctuation">;</span>

        <span class="token comment">// Release the data pointer from the source object so that</span>
        <span class="token comment">// the destructor does not free the memory multiple times.</span>
        other<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
        other<span class="token punctuation">.</span>_length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
   <span class="token comment">// Retrieves the length of the data resource.</span>
   size_t <span class="token function">Length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
   <span class="token punctuation">{</span>
      <span class="token keyword">return</span> _length<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
   size_t _length<span class="token punctuation">;</span> <span class="token comment">// The length of the resource.</span>
   <span class="token keyword">int</span><span class="token operator">*</span> _data<span class="token punctuation">;</span> <span class="token comment">// The resource.</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，有时候为了减少重复代码，在移动构造函数中也可以调用移动运算符，不过需要确保这样做不会有什么问题。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// Move constructor.</span>
<span class="token function">MemoryBlock</span><span class="token punctuation">(</span>MemoryBlock<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span> <span class="token keyword">noexcept</span>
   <span class="token operator">:</span> <span class="token function">_data</span><span class="token punctuation">(</span><span class="token keyword">nullptr</span><span class="token punctuation">)</span>
   <span class="token punctuation">,</span> <span class="token function">_length</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token operator">*</span><span class="token keyword">this</span> <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token function">move</span><span class="token punctuation">(</span>other<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面要介绍的是，如果一个类自定了析构函数，赋值构造函数，赋值运算符三者之一，则默认的移动构造和移动运算符就会被delete。如果使用一个右值来构造对象，那么编译器将会调用赋值构造函数。</p><p>例如，MemoryBlock自定了析构函数，赋值构造函数，赋值运算符，于是默认的移动构造和移动运算符就会被delete。</p><p>即便你使用了<code>MemoryBlock m2(std::move(m1));</code>，其仍然调用的是赋值构造函数。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;algorithm&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">MemoryBlock</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>

   <span class="token comment">// Simple constructor that initializes the resource.</span>
   <span class="token keyword">explicit</span> <span class="token function">MemoryBlock</span><span class="token punctuation">(</span>size_t length<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">_length</span><span class="token punctuation">(</span>length<span class="token punctuation">)</span>
      <span class="token punctuation">,</span> <span class="token function">_data</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In MemoryBlock(size_t). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> _length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Destructor.</span>
   <span class="token operator">~</span><span class="token function">MemoryBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In ~MemoryBlock(). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> _length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>_data <span class="token operator">!=</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; Deleting resource.&quot;</span><span class="token punctuation">;</span>
         <span class="token comment">// Delete the resource.</span>
         <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> _data<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Copy constructor.</span>
   <span class="token function">MemoryBlock</span><span class="token punctuation">(</span><span class="token keyword">const</span> MemoryBlock<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">_length</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>_length<span class="token punctuation">)</span>
      <span class="token punctuation">,</span> <span class="token function">_data</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>other<span class="token punctuation">.</span>_length<span class="token punctuation">]</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In MemoryBlock(const MemoryBlock&amp;). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> other<span class="token punctuation">.</span>_length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;. Copying resource.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

      std<span class="token double-colon punctuation">::</span><span class="token function">copy</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>_data<span class="token punctuation">,</span> other<span class="token punctuation">.</span>_data <span class="token operator">+</span> _length<span class="token punctuation">,</span> _data<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Copy assignment operator.</span>
   MemoryBlock<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> MemoryBlock<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;In operator=(const MemoryBlock&amp;). length = &quot;</span>
                <span class="token operator">&lt;&lt;</span> other<span class="token punctuation">.</span>_length <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;. Copying resource.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">!=</span> <span class="token operator">&amp;</span>other<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token comment">// Free the existing resource.</span>
         <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> _data<span class="token punctuation">;</span>

         _length <span class="token operator">=</span> other<span class="token punctuation">.</span>_length<span class="token punctuation">;</span>
         _data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>_length<span class="token punctuation">]</span><span class="token punctuation">;</span>
         std<span class="token double-colon punctuation">::</span><span class="token function">copy</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>_data<span class="token punctuation">,</span> other<span class="token punctuation">.</span>_data <span class="token operator">+</span> _length<span class="token punctuation">,</span> _data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// Retrieves the length of the data resource.</span>
   size_t <span class="token function">Length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
   <span class="token punctuation">{</span>
      <span class="token keyword">return</span> _length<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
   size_t _length<span class="token punctuation">;</span> <span class="token comment">// The length of the resource.</span>
   <span class="token keyword">int</span><span class="token operator">*</span> _data<span class="token punctuation">;</span> <span class="token comment">// The resource.</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MemoryBlock <span class="token function">m1</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    MemoryBlock <span class="token function">m2</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token function">move</span><span class="token punctuation">(</span>m1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此这就诞生了另一个著名定理<strong>rule of five定理</strong>。即如果你需要自定义移动构造函数和移动运算符，那么大概率你需要自定义5个特殊函数(析构函数，复制构造函数，赋值运算符，移动构造函数，移动运算符)。</p><p>这里顺便再提到另一个<strong>rule of zero</strong>定理，</p><p>1.类不应定义任何特殊函数（复制/移动构造函数/赋值和析构函数），除非它们是专用于资源管理的类。</p><p>此举为了满足设计上的单一责任原则，将数据模块与功能模块在代码层面分离，降低耦合度。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">rule_of_zero</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>string cppstring<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">rule_of_zero</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> arg<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">cppstring</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.基类作为管理资源的类在被继承时，析构函数可能必须要声明为public virtual，这样的行为会破坏移动复制构造，因此，如果基类在此时的默认函数应设置为default。</p><p>此举为了满足多态类在C ++核心准则中禁止复制的编码原则。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">base_of_five_defaults</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">base_of_five_defaults</span><span class="token punctuation">(</span><span class="token keyword">const</span> base_of_five_defaults<span class="token operator">&amp;</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    <span class="token function">base_of_five_defaults</span><span class="token punctuation">(</span>base_of_five_defaults<span class="token operator">&amp;&amp;</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    base_of_five_defaults<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> base_of_five_defaults<span class="token operator">&amp;</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    base_of_five_defaults<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span>base_of_five_defaults<span class="token operator">&amp;&amp;</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">base_of_five_defaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于这个点，还是需要一个例子来加深印象，</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;algorithm&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;A()&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token operator">~</span><span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    <span class="token function">A</span><span class="token punctuation">(</span><span class="token keyword">const</span> A<span class="token operator">&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;A(const A&amp; other)&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    A<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> A<span class="token operator">&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;operator=(const A&amp; other)&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">A</span><span class="token punctuation">(</span>A<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;A(A&amp;&amp; other)&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    A<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span>A<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;operator=(A&amp;&amp; other)&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">DataMgr</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">DataMgr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        val_<span class="token punctuation">.</span><span class="token function">reserve</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">DataMgr</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    <span class="token comment">// DataMgr(const DataMgr&amp; other) = default;</span>
    <span class="token comment">// DataMgr&amp; operator=(const DataMgr&amp; other) = default;</span>
    <span class="token comment">// DataMgr(DataMgr&amp;&amp; other) = default;</span>
    <span class="token comment">// DataMgr&amp; operator=(DataMgr&amp;&amp; other) = default;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span>A<span class="token operator">&amp;</span> a<span class="token punctuation">)</span><span class="token punctuation">{</span>
        val_<span class="token punctuation">.</span><span class="token function">emplace_back</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span>A<span class="token operator">&gt;</span> val_<span class="token punctuation">;</span>              <span class="token comment">//同之前一样</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    A a1<span class="token punctuation">,</span> a2<span class="token punctuation">;</span>
    DataMgr s1<span class="token punctuation">;</span>
    s1<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>a1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    s1<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>a2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;========&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    DataMgr s2 <span class="token punctuation">;</span>
    s2 <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token function">move</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的运行结果如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>A()
A()
A(const A&amp; other)
A(const A&amp; other)
========
A(const A&amp; other)
A(const A&amp; other)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管使用了<code>s2 = std::move(s1)</code>这里使用了移动语义，然而由于定义了析构函数，移动操作被delete，导致了调用了复制构造。试想如果这里的val_的数据量很大，那么程序的运行效率将会相差很大。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>特殊成员函数是编译器可能自动生成的函数，它包括下面六种默认构造函数，析构函数，复制构造函数，赋值运算符，移动构造函数，移动运算符。</li><li>对于构造函数而言，如果需要自定义初始化成员的方式，则不能使用默认的构造函数，需要编写自定义构造函数。</li><li>对于析构函数而言，如果其内部管理了资源(原始指针，文件描述符，线程等等)，则通常需要编写自定义的析构函数。如果只是借用资源，通常使用默认析构函数就可以。</li><li>根据rule of three，析构函数进行了自定义，大概率你也需要自定义复制构造函数和赋值运算符。</li><li>默认移动操作仅当类没有显式声明移动操作，复制操作，析构函数时才自动生成。如果你定义了析构函数或者复制操作，此时的移动操作会调用复制构造函数。</li><li>如果一个类没有显示定义复制构造却显示定义了移动构造，则复制构造函数被delete。同理如果一个类没有显示定义赋值运算符却显示定义了移动运算符，则赋值运算符数被delete。</li><li>日常开发中，尽量显示指明是否使用default的特殊函数以避免某些成员函数被delete。如果某些方法不需要生成，则应该delete掉。</li></ul>`,44);function k(v,m){const a=l("ExternalLinkIcon");return p(),e("div",null,[u,n("p",null,[n("a",r,[o("移动构造函数和移动赋值运算符"),c(a)])]),d])}const g=t(i,[["render",k],["__file","cpp_special_function.html.vue"]]);export{g as default};
