import{_ as i,V as l,W as d,X as s,Y as e,Z as t,a1 as a,F as c}from"./framework-d934f75f.js";const r={},o=s("h1",{id:"关机时-如何控制systemd服务的关闭顺序",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#关机时-如何控制systemd服务的关闭顺序","aria-hidden":"true"},"#"),e(" 关机时，如何控制systemd服务的关闭顺序?")],-1),p=s("p",null,"在工作中，我们通常遇到的问题是，如何控制systemd服务的启动顺序，同志们第一反应就会是使用Before=或者After=去进行控制。 问题来了，如果服务启动时没有顺序要求，但是关闭时有顺序要求， 该如何操作？",-1),u=s("p",null,"通过查找如下相关文档， 我查到了这样一段话：",-1),v={href:"https://www.freedesktop.org/software/systemd/man/systemd.unit.html",target:"_blank",rel:"noopener noreferrer"},m=s("blockquote",null,[s("p",null,"When two units with an ordering dependency between them are shut down, the inverse of the start-up order is applied. I.e. if a unit is configured with After= on another unit, the former is stopped before the latter if both are shut down.")],-1),b=s("p",null,"上面这段话的意思是，如果使用After=或者Before=规定了进程的启动顺序， 那么关闭时的顺序与启动时的顺序将是相反的。",-1),h=s("p",null,"比如有A、B、C三个服务， 启动时的顺序时A->B->C, 那么服务的关闭顺序将是C->B->A。 事实是这样的吗？ 下面通过一个小实验进行验证。",-1),k=s("h1",{id:"验证systemd的关闭顺序",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#验证systemd的关闭顺序","aria-hidden":"true"},"#"),e(" 验证systemd的关闭顺序")],-1),g=s("p",null,"这里我们准备三个服务，服务在启动时候会向文件中写入相应的启动和关闭日志，通过日志我们来判断服务的启动和关闭顺序。",-1),y={href:"http://xn--test1-fk5hr26jz64f.sh",target:"_blank",rel:"noopener noreferrer"},f=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
start<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;start1&quot;</span> <span class="token operator">&gt;&gt;</span> /home/test/test.log
<span class="token punctuation">;</span><span class="token punctuation">;</span>
stop<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;stop1&quot;</span> <span class="token operator">&gt;&gt;</span> /home/test/test.log
<span class="token punctuation">;</span><span class="token punctuation">;</span>
*<span class="token punctuation">)</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是test1服务的systemd的service文件test1.service，这里我们只需要脚本执行一次，因此使用的Type是oneshot类型，并且指定RemainAfterExit=yes，意思是该脚本只会执行一次，并且退出后， 不会意味着服务是inacive状态， 将会显示服务是active(exited)状态。</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>[Unit]
Description=mytest:while date service
After=network.target sshd.service

[Service]
Type=oneshot
ExecStart= /home/test/test1.sh start
ExecStop= /home/test/test1.sh stop
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>test2.sh与test1.sh类似，只是打印的日志内容不同。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
start<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;start2&quot;</span> <span class="token operator">&gt;&gt;</span> /home/test/test.log
<span class="token punctuation">;</span><span class="token punctuation">;</span>
stop<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;stop2&quot;</span> <span class="token operator">&gt;&gt;</span> /home/test/test.log
<span class="token punctuation">;</span><span class="token punctuation">;</span>
*<span class="token punctuation">)</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>test2.service同test1.service， 不同的是我在After中增加了test1.service， 这就意味着test2晚于test1启动。</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>[Unit]
Description=mytest:while date service
After=network.target sshd.service test1.service

[Service]
Type=oneshot
ExecStart= /home/test/test2.sh start
ExecStop= /home/test/test2.sh stop
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),_={href:"http://test3.xn--shtest1-0x3l.sh",target:"_blank",rel:"noopener noreferrer"},x=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
start<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;start3&quot;</span> <span class="token operator">&gt;&gt;</span> /home/test/test.log
<span class="token punctuation">;</span><span class="token punctuation">;</span>
stop<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;stop3&quot;</span> <span class="token operator">&gt;&gt;</span> /home/test/test.log
<span class="token punctuation">;</span><span class="token punctuation">;</span>
*<span class="token punctuation">)</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>test3.service同test1.service，不同的是我在After中增加了test2.service， 这就意味着test3晚于test2启动。</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>[Unit]
Description=mytest:while date service
After=network.target sshd.service test2.service

[Service]
Type=oneshot
ExecStart= /home/test/test3.sh start
ExecStop= /home/test/test3.sh stop
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过下面的命令将三个服务分别加入到systemd的目录中，并且启动它们并设为开机启动。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cp</span> test1.service /usr/lib/systemd/system/
<span class="token function">cp</span> test2.service /usr/lib/systemd/system/
<span class="token function">cp</span> test3.service /usr/lib/systemd/system/
systemctl daemon-reload
systemctl <span class="token builtin class-name">enable</span> test1
systemctl <span class="token builtin class-name">enable</span> test2
systemctl <span class="token builtin class-name">enable</span> test3
systemctl start test1
systemctl start test2
systemctl start test3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，test.log文件已经打印出了刚刚手动执行启动命令产生的日志</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># cat test.log</span>
start1
start2
start3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上述的步骤，我们构建出了三个服务，这三个服务的启动顺序是test1-&gt;test2-&gt;test3， 那么根据我们的推测， 关闭顺序应该是test3-&gt;test2-&gt;test1，是否如此呢？</p><p>下面就是到了最终验证的时刻！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等待一小会后，我们打印出test.log</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># cat test.log</span>
start1
start2
start3
stop3
stop2
stop1
start1
start2
start3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到停止时依次打印出了stop3，stop2，stop1。这与我们的猜想以及文档中的说明是一致的。</p><h1 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h1><p>systemd通过After和Before可以指定服务的启动顺序， 在系统关闭时，服务的关闭顺序和启动顺序是相反的， 先启动的后关闭，后启动的先关闭。</p>`,15);function w(q,A){const n=c("ExternalLinkIcon");return l(),d("div",null,[o,p,u,s("p",null,[s("a",v,[e("https://www.freedesktop.org/software/systemd/man/systemd.unit.html"),t(n)])]),m,b,h,k,g,s("p",null,[s("a",y,[e("首先是test1.sh"),t(n)]),e("， 该文件接受start/stop两个命令行参数， 启动时写入日志start1， 关闭时写入日志stop1。")]),f,s("p",null,[s("a",_,[e("test3.sh同test1.sh"),t(n)])]),x])}const B=i(r,[["render",w],["__file","how-to-control-stop-flow-in-systemd.html.vue"]]);export{B as default};
