import{_ as t,V as o,W as p,X as n,Y as s,$ as e,a0 as l,F as c}from"./framework-c954d91f.js";const i={},u=l(`<h1 id="c-中单例模式总结" tabindex="-1"><a class="header-anchor" href="#c-中单例模式总结" aria-hidden="true">#</a> c++中单例模式总结</h1><p>通常而言，c++的单例模式通常有如下一些实现办法：</p><ul><li>普通懒汉</li><li>加锁懒汉</li><li>静态内部变量</li><li>饿汉单例</li><li>std::call_once单例</li></ul><h2 id="普通懒汉" tabindex="-1"><a class="header-anchor" href="#普通懒汉" aria-hidden="true">#</a> 普通懒汉</h2><p>对于普通懒汉：</p><ul><li><strong>构造函数和析构函数</strong>应该为<strong>private</strong>类型，禁止外部构造和析构</li><li><strong>拷贝构造函数</strong>和<strong>赋值运算符</strong>应为<strong>private</strong>类型或者加上** = delete**标记，禁止外部拷贝和赋值，确保单例的唯一性</li><li>Singleton的有一个静态的函数getInstance用于获取静态对象。</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Singleton</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">static</span> Singleton<span class="token operator">*</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token keyword">const</span> Singleton<span class="token operator">&amp;</span> instance<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">delete</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> Singleton<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Singleton<span class="token operator">&amp;</span> instance<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">delete</span><span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">~</span><span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">static</span> Singleton<span class="token operator">*</span> m_singletonInstance<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Singleton<span class="token operator">*</span> Singleton<span class="token double-colon punctuation">::</span>m_singletonInstance <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

Singleton<span class="token operator">*</span> <span class="token class-name">Singleton</span><span class="token double-colon punctuation">::</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">nullptr</span> <span class="token operator">==</span> m_singletonInstance<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        m_singletonInstance <span class="token operator">=</span> <span class="token keyword">new</span> Singleton<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> m_singletonInstance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token class-name">Singleton</span><span class="token double-colon punctuation">::</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>m_singletonInstance<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">delete</span> m_singletonInstance<span class="token punctuation">;</span>
        m_singletonInstance <span class="token operator">=</span> <span class="token keyword">nullptr</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token class-name">Singleton</span><span class="token double-colon punctuation">::</span><span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;create instance&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Singleton</span><span class="token double-colon punctuation">::</span><span class="token operator">~</span><span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;destroy instance&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Singleton<span class="token operator">*</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token double-colon punctuation">::</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    instance<span class="token operator">-&gt;</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>普通懒汉会有很明显的线程安全问题，不能严格地做到单例。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/language/cplusplus/cpp_singleton_summarize/intro.png" alt="普通懒汉的线程安全问题" tabindex="0" loading="lazy"><figcaption>普通懒汉的线程安全问题</figcaption></figure><h2 id="加锁懒汉" tabindex="-1"><a class="header-anchor" href="#加锁懒汉" aria-hidden="true">#</a> 加锁懒汉</h2><h2 id="静态内部变量" tabindex="-1"><a class="header-anchor" href="#静态内部变量" aria-hidden="true">#</a> 静态内部变量</h2><h2 id="饿汉单例" tabindex="-1"><a class="header-anchor" href="#饿汉单例" aria-hidden="true">#</a> 饿汉单例</h2><h2 id="std-call-once单例" tabindex="-1"><a class="header-anchor" href="#std-call-once单例" aria-hidden="true">#</a> std::call_once单例</h2>`,13),r={href:"https://www.cnblogs.com/xiaolincoding/p/11437231.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://blog.csdn.net/u011726005/article/details/82356538",target:"_blank",rel:"noopener noreferrer"},k={href:"https://blog.csdn.net/bdss58/article/details/44813597",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const a=c("ExternalLinkIcon");return o(),p("div",null,[u,n("p",null,[s("参考文章： "),n("a",r,[s("https://www.cnblogs.com/xiaolincoding/p/11437231.html"),e(a)])]),n("p",null,[n("a",d,[s("https://blog.csdn.net/u011726005/article/details/82356538"),e(a)])]),n("p",null,[n("a",k,[s("https://blog.csdn.net/bdss58/article/details/44813597"),e(a)])])])}const h=t(i,[["render",v],["__file","cpp_singleton_summarize.html.vue"]]);export{h as default};
