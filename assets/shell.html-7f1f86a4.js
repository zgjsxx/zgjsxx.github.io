import{_ as a,V as s,W as e,a0 as n}from"./framework-9a29aaa0.js";const l={},i=n(`<ul><li><a href="#shell">shell</a><ul><li><a href="#shell%E5%91%BD%E4%BB%A4%E4%B8%AD%E7%9A%84%E5%88%86%E5%8F%B7--%E5%92%8C-%E7%9A%84%E5%8C%BA%E5%88%AB">shell命令中的分号， &amp;&amp; 和 ||的区别</a></li><li><a href="#%E5%8F%98%E9%87%8F%E7%9A%84%E5%AE%9A%E4%B9%89">变量的定义</a></li></ul></li></ul><h1 id="shell" tabindex="-1"><a class="header-anchor" href="#shell" aria-hidden="true">#</a> shell</h1><h2 id="shell命令中的分号-和-的区别" tabindex="-1"><a class="header-anchor" href="#shell命令中的分号-和-的区别" aria-hidden="true">#</a> shell命令中的分号， &amp;&amp; 和 ||的区别</h2><p>分号： 顺序地独立执行各条命令，彼此不关心是否失败，所有命令都会执行。</p><p>&amp;&amp;： 顺序执行各条命令，只有当前一个命令执行成功的时候，才执行后面的。</p><p>||： 顺序的执行各条命令，只有当前门的一个命令执行失败的时候，才执行后面的。</p><h2 id="变量的定义" tabindex="-1"><a class="header-anchor" href="#变量的定义" aria-hidden="true">#</a> 变量的定义</h2><p>Shell变量名以字母或者下划线开头，可包含任意数量的字母，数字或下划线。变量名中的字符数量没有限制。Shell变量保存的数据类型是字符串类型。</p><p>如下所示，变量赋值的方法是写入变量名，紧接着写入=和新值，中间不留空格。当需要访问Shell变量时，要在变量名前加上$字符。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token assign-left variable">myvar</span><span class="token operator">=</span>this_is_a_long_string_that_does_not_mean_much Assign a value
$ <span class="token builtin class-name">echo</span> <span class="token variable">$myvar</span> Print the value
this_is_a_long_string_that_does_not_mean_much
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当字符串中包含空格时，需要使用引号。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">first</span><span class="token operator">=</span>isaac <span class="token assign-left variable">middle</span><span class="token operator">=</span>bashevis <span class="token assign-left variable">last</span><span class="token operator">=</span>singer <span class="token comment">#Multiple assignments allowed on one line</span>
<span class="token assign-left variable">fullname</span><span class="token operator">=</span><span class="token string">&quot;isaac bashevis singer&quot;</span> <span class="token comment">#Use quotes for whitespace in value</span>
<span class="token assign-left variable">oldname</span><span class="token operator">=</span><span class="token variable">$fullname</span> <span class="token comment">#Quotes not needed to preserve spaces in value</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),t=[i];function r(o,p){return s(),e("div",null,t)}const d=a(l,[["render",r],["__file","shell.html.vue"]]);export{d as default};
