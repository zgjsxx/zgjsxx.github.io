import{_ as a,V as l,W as i,X as s,Y as e,$ as t,a0 as r,F as c}from"./framework-9a29aaa0.js";const o={},d=s("h1",{id:"mysql-8-0-33源码编译",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#mysql-8-0-33源码编译","aria-hidden":"true"},"#"),e(" mysql 8.0.33源码编译")],-1),p=s("p",null,"源码地址为：",-1),u={href:"https://github.com/mysql/mysql-server/archive/refs/tags/mysql-8.0.33.tar.gz",target:"_blank",rel:"noopener noreferrer"},m=r(`<p>使用cmake进行编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> ncurses-devel

yum <span class="token function">install</span> libtirpc-devel

dnf <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span>devel <span class="token function">install</span> libtirpc-devel

yum <span class="token function">install</span> libudev-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> build
<span class="token builtin class-name">cd</span> build
cmake <span class="token punctuation">..</span> <span class="token parameter variable">-DWITH_DEBUG</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DDOWNLOAD_BOOST</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_BOOST</span><span class="token operator">=</span>/home/work/cpp_proj/mysql-server-mysql-8.0.33/build/boost
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function v(b,_){const n=c("ExternalLinkIcon");return l(),i("div",null,[d,p,s("p",null,[s("a",u,[e("https://github.com/mysql/mysql-server/archive/refs/tags/mysql-8.0.33.tar.gz"),t(n)])]),m])}const k=a(o,[["render",v],["__file","mysql_source_code_build.html.vue"]]);export{k as default};
