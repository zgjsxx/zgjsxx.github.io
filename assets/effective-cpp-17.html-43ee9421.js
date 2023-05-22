import{_ as n,V as a,W as s,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<h1 id="effective-c-17-独立语句将newed对象置入智能指针" tabindex="-1"><a class="header-anchor" href="#effective-c-17-独立语句将newed对象置入智能指针" aria-hidden="true">#</a> effective c++ 17 独立语句将newed对象置入智能指针</h1><p>智能指针可以帮助用户更好的管理资源，避免资源泄露。但是如果使用不当，还是可能出现资源泄露。本文便是讲解了智能指针使用不当可能出现资源泄漏的一个场景。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>考虑下面的函数：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token function">processWidget</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">shared_ptr</span><span class="token generic class-name"><span class="token operator">&lt;</span>Widget<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token keyword">new</span> Widget<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">priority</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果编译器的执行顺序像下面这样：</p><ul><li><ol><li>执行&quot;new Widget&quot;</li></ol></li><li><ol start="2"><li>调用priority(抛出异常)</li></ol></li><li><ol start="3"><li>调用std::shared_ptr构造函数</li></ol></li></ul><p>如果第2步出现了异常，那么第三步就执行不到，资源就无法析构。</p><p>修改方法为如下:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>std<span class="token double-colon punctuation">::</span>shared_ptr<span class="token operator">&lt;</span>Widget<span class="token operator">&gt;</span> <span class="token function">pw</span><span class="token punctuation">(</span><span class="token keyword">new</span> Widget<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">processWidget</span><span class="token punctuation">(</span>pw<span class="token punctuation">,</span> <span class="token function">priority</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样写，不仅解决了可能存在的资源无法析构的问题，并且代码结构也都清晰了很多。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>请以独立语句将newed对象对象置于智能指针内。如果不这样做，一旦异常被抛出，有可能导致难以察觉的资源泄露。</li></ul>`,13),c=[p];function o(i,l){return a(),s("div",null,c)}const r=n(t,[["render",o],["__file","effective-cpp-17.html.vue"]]);export{r as default};
