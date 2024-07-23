import{_ as e,V as a,W as s,a0 as n}from"./framework-9a29aaa0.js";const t={},i=n(`<h2 id="删除带有空格的文件" tabindex="-1"><a class="header-anchor" href="#删除带有空格的文件" aria-hidden="true">#</a> 删除带有空格的文件</h2><p>有三个文件，名字中带有空格， 如何使用通配符删除它们？</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>my test1.txt
my test2.txt
my test3.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> my<span class="token punctuation">\\</span> test*.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,4),d=[i];function r(l,c){return a(),s("div",null,d)}const u=e(t,[["render",r],["__file","linux-rm.html.vue"]]);export{u as default};
