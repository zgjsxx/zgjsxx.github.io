import{_ as t,V as i,W as o,X as n,Y as a,$ as e,a0 as p,F as c}from"./framework-9a29aaa0.js";const l={},d=p(`<h1 id="深入了解glibc的条件变量" tabindex="-1"><a class="header-anchor" href="#深入了解glibc的条件变量" aria-hidden="true">#</a> 深入了解glibc的条件变量</h1><h2 id="pthread-cond-t" tabindex="-1"><a class="header-anchor" href="#pthread-cond-t" aria-hidden="true">#</a> pthread_cond_t</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">union</span>
<span class="token punctuation">{</span>
  <span class="token keyword">struct</span> <span class="token class-name">__pthread_cond_s</span> __data<span class="token punctuation">;</span>
  <span class="token keyword">char</span> __size<span class="token punctuation">[</span>__SIZEOF_PTHREAD_COND_T<span class="token punctuation">]</span><span class="token punctuation">;</span>
  __extension__ <span class="token keyword">long</span> <span class="token keyword">long</span> <span class="token keyword">int</span> __align<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token class-name">pthread_cond_t</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>
<span class="token keyword">struct</span> <span class="token class-name">__pthread_cond_s</span>
<span class="token punctuation">{</span>
  __extension__ <span class="token keyword">union</span>
  <span class="token punctuation">{</span>
    __extension__ <span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token keyword">long</span> <span class="token keyword">int</span> __wseq<span class="token punctuation">;</span>
    <span class="token keyword">struct</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __low<span class="token punctuation">;</span>
      <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __high<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> __wseq32<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  __extension__ <span class="token keyword">union</span>
  <span class="token punctuation">{</span>
    __extension__ <span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token keyword">long</span> <span class="token keyword">int</span> __g1_start<span class="token punctuation">;</span>
    <span class="token keyword">struct</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __low<span class="token punctuation">;</span>
      <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __high<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> __g1_start32<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __g_refs<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> __LOCK_ALIGNMENT<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __g_size<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __g1_orig_size<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __wrefs<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __g_signals<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>__wrefs: 等待的线程数</li><li>__wseq32：等待的序列号</li></ul><h2 id="pthread-cond-signal" tabindex="-1"><a class="header-anchor" href="#pthread-cond-signal" aria-hidden="true">#</a> ___pthread_cond_signal</h2><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,7),r={href:"https://zhuanlan.zhihu.com/p/374385534",target:"_blank",rel:"noopener noreferrer"},u={href:"https://blog.csdn.net/weixin_34128411/article/details/88883008",target:"_blank",rel:"noopener noreferrer"};function k(_,v){const s=c("ExternalLinkIcon");return i(),o("div",null,[d,n("p",null,[n("a",r,[a("https://zhuanlan.zhihu.com/p/374385534"),e(s)])]),n("p",null,[n("a",u,[a("https://blog.csdn.net/weixin_34128411/article/details/88883008"),e(s)])])])}const m=t(l,[["render",k],["__file","linux-glibc-condition-var.html.vue"]]);export{m as default};
