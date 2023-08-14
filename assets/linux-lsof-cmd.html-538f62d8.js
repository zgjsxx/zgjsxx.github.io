import{_ as a,V as e,W as r,a0 as d}from"./framework-9a29aaa0.js";const h={},i=d(`<h1 id="linux工具之lsof命令详解" tabindex="-1"><a class="header-anchor" href="#linux工具之lsof命令详解" aria-hidden="true">#</a> Linux工具之lsof命令详解</h1><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2><p>命令 lsof （ list opened files ）负责列出系统中已经打开的文件，包括普通文件，目录，块特殊文件，字符特殊文件，正在执行的文本引用，库，流或网络文件（例如：网络套接字，NFS文件或UNIX域套接字）。</p><h2 id="常用参数" tabindex="-1"><a class="header-anchor" href="#常用参数" aria-hidden="true">#</a> 常用参数</h2><p>-p pid : 输出指定进程打开的文件；</p><p>-l : 输出中使用ID代替用户名；</p><p>-u userName : 输出指定用户打开的文件；</p><p>-c string : 输出 COMMAND 列中包含 string 的项；</p><p>-d fd : 输出包含指定描述符的项；</p><p>fileName : 输出打开文件 fileName 的所有项；</p><p>-i [46] [protocol][@hostname|hostaddr][:service|port] : 输出符合指定条件的项，其中：</p><pre><code>46 ：分别指 IPv4、IPv6；

protocol ：指 TCP 或 UDP；

hostname :  网络主机名；

hostaddr : IP 地址；

service : 包含在 /etc/services 中的名称；

port : 端口号，可以是多个；
</code></pre><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><h3 id="无参数" tabindex="-1"><a class="header-anchor" href="#无参数" aria-hidden="true">#</a> 无参数</h3><h3 id="p参数" tabindex="-1"><a class="header-anchor" href="#p参数" aria-hidden="true">#</a> -p参数</h3><h3 id="i参数" tabindex="-1"><a class="header-anchor" href="#i参数" aria-hidden="true">#</a> -I参数</h3><h3 id="u参数" tabindex="-1"><a class="header-anchor" href="#u参数" aria-hidden="true">#</a> -u参数</h3><h3 id="c参数" tabindex="-1"><a class="header-anchor" href="#c参数" aria-hidden="true">#</a> -c参数</h3><h3 id="d参数" tabindex="-1"><a class="header-anchor" href="#d参数" aria-hidden="true">#</a> -d参数</h3><h3 id="lsof-文件名" tabindex="-1"><a class="header-anchor" href="#lsof-文件名" aria-hidden="true">#</a> lsof + 文件名</h3><p>执行命令 lsof /usr/lib64/ld-2.17.so，查看打开文件/usr/lib64/ld-2.17.so的进程项，如下所示：</p><h3 id="i参数-1" tabindex="-1"><a class="header-anchor" href="#i参数-1" aria-hidden="true">#</a> -i参数</h3><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>`,24),n=[i];function s(t,c){return e(),r("div",null,n)}const l=a(h,[["render",s],["__file","linux-lsof-cmd.html.vue"]]);export{l as default};
