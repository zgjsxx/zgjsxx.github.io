import{_ as a,V as e,W as i,a0 as s}from"./framework-9a29aaa0.js";const n={},l=s(`<ul><li><a href="#vim%E5%AE%9E%E7%94%A8%E6%8A%80%E5%B7%A7">vim实用技巧</a><ul><li><a href="#vim%E5%88%A0%E9%99%A4%E6%8C%87%E5%AE%9A%E7%9A%84%E5%86%85%E5%AE%B9">vim删除指定的内容</a></li><li><a href="#vim%E6%89%93%E5%BC%80%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%96%87%E4%BB%B6%E8%BF%9B%E8%A1%8C%E7%BC%96%E8%BE%91">vim打开二进制文件进行编辑</a></li><li><a href="#vim-%E5%A4%9A%E7%AA%97%E5%8F%A3%E4%B9%8B%E9%97%B4%E8%BF%9B%E8%A1%8C%E7%A7%BB%E5%8A%A8">vim 多窗口之间进行移动</a></li></ul></li></ul><h1 id="vim实用技巧" tabindex="-1"><a class="header-anchor" href="#vim实用技巧" aria-hidden="true">#</a> vim实用技巧</h1><h2 id="vim删除指定的内容" tabindex="-1"><a class="header-anchor" href="#vim删除指定的内容" aria-hidden="true">#</a> vim删除指定的内容</h2><p>vim 删除当前光标位置到文件末尾 dG</p><p>vim 删除当前光标位置到文件开头 d1G</p><h2 id="vim打开二进制文件进行编辑" tabindex="-1"><a class="header-anchor" href="#vim打开二进制文件进行编辑" aria-hidden="true">#</a> vim打开二进制文件进行编辑</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>. <span class="token function">vim</span> bin <span class="token parameter variable">-b</span> 使用二进制模式打开文件。
<span class="token number">2</span>. :%<span class="token operator">!</span>xxd 运行xxd程序转换文件为可编辑格式。
<span class="token number">3</span>. 编辑文件。
<span class="token number">4</span>. :%<span class="token operator">!</span>xxd <span class="token parameter variable">-r</span> 将文件转换回二进制格式。
<span class="token number">5</span>. 保存退出即可。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vim-多窗口之间进行移动" tabindex="-1"><a class="header-anchor" href="#vim-多窗口之间进行移动" aria-hidden="true">#</a> vim 多窗口之间进行移动</h2><p>在 Vim 中使用多个窗口（也称为“分屏”）可以极大地提升你的工作效率。以下是一些常用的多窗口管理和移动命令：</p><p>打开新窗口</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>:split 或 :sp：水平分割窗口
:vsplit 或 :vsp：垂直分割窗口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在窗口之间移动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Ctrl-w h 或 Ctrl-w 左方向键：移动到左边的窗口
Ctrl-w j 或 Ctrl-w 下方向键：移动到下面的窗口
Ctrl-w k 或 Ctrl-w 上方向键：移动到上面的窗口
Ctrl-w l 或 Ctrl-w 右方向键：移动到右边的窗口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),r=[l];function d(v,t){return e(),i("div",null,r)}const m=a(n,[["render",d],["__file","vim-skill.html.vue"]]);export{m as default};
