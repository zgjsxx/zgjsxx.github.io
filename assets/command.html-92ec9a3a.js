import{_ as n,V as s,W as a,a0 as p}from"./framework-9a29aaa0.js";const t={},o=p(`<hr><p>category:</p><ul><li>设计模式 tag:</li><li>设计模式</li></ul><hr><h1 id="设计模式-命令模式-行为型" tabindex="-1"><a class="header-anchor" href="#设计模式-命令模式-行为型" aria-hidden="true">#</a> 设计模式 - 命令模式(行为型)</h1><p>命令模式主要解决了什么问题？</p><p>在软件系统中，<strong>行为的请求者</strong>和<strong>行为的执行者</strong>通常是一种<strong>紧耦合</strong>的关系，但某些场合，比如需要对行为进行记录、撤销或重做、事务等处理时，这种无法抵御变化的紧耦合的设计就不太合适。</p><p>在网上也看到其他一些对于命令模式的理解，我觉得也有一定道理。</p><blockquote><p>命令模式用到最核心的实现手段，就是将<strong>函数封装成对象</strong>。我们知道，在大部分编程语言中，函数是没法作为参数传递给其他函数的，也没法赋值给变量。借助命令模式，我们将函数封装成对象，这样就可以实现把函数像对象一样使用。</p></blockquote><blockquote><p>命令模式的主要作用和应用场景，是用来控制命令的执行，比如，异步、延迟、排队执行命令、撤销重做命令、存储命令、给命令记录日志等等，这才是命令模式能发挥独一无二作用的地方。</p></blockquote><p>命令模式的优点：</p><ul><li>单一职责原则。 你可以解耦触发和执行操作的类。</li><li>开闭原则。 你可以在不修改已有客户端代码的情况下在程序中创建新的命令。</li><li>你可以实现撤销和恢复功能。</li><li>你可以实现操作的延迟执行。</li><li>你可以将一组简单命令组合成一个复杂命令。</li></ul><p>命令模式的缺点:</p><ul><li>代码可能会变得更加复杂， 因为你在发送者和接收者之间增加了一个全新的层次。</li></ul><p>这里给出了一个实际的代码，这里的Invoker代表游戏的玩家，Receiver代表游戏中的角色，游戏玩家通过发送前进和跳跃的命令给游戏的角色使得游戏角色可以进行活动。</p><p>其UML图如下所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/design-pattern/command.png" alt="命令模式UML图" tabindex="0" loading="lazy"><figcaption>命令模式UML图</figcaption></figure><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">GameRole</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">GameRole</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">name_</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">GameRole</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;game role &quot;</span><span class="token operator">&lt;&lt;</span> name_ <span class="token operator">&lt;&lt;</span><span class="token string">&quot; move forward &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; step&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">void</span> <span class="token function">jump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;game role &quot;</span> <span class="token operator">&lt;&lt;</span> name_ <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; jump&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    std<span class="token double-colon punctuation">::</span>string name_<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Command</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Command</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">MoveCommand</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Command</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">explicit</span> <span class="token function">MoveCommand</span><span class="token punctuation">(</span>GameRole<span class="token operator">*</span> role<span class="token punctuation">,</span> <span class="token keyword">int</span> step<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">step_</span><span class="token punctuation">(</span>step<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">role_</span><span class="token punctuation">(</span>role<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">MoveCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token keyword">override</span>
    <span class="token punctuation">{</span>
        role_<span class="token operator">-&gt;</span><span class="token function">move</span><span class="token punctuation">(</span>step_<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> step_<span class="token punctuation">;</span>
    GameRole<span class="token operator">*</span> role_<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">JumpCommand</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Command</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">explicit</span> <span class="token function">JumpCommand</span><span class="token punctuation">(</span>GameRole<span class="token operator">*</span> role<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">role_</span><span class="token punctuation">(</span>role<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">JumpCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token keyword">override</span>
    <span class="token punctuation">{</span>
        role_<span class="token operator">-&gt;</span><span class="token function">jump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    GameRole<span class="token operator">*</span> role_<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Invoker</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Invoker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
    <span class="token operator">~</span><span class="token function">Invoker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">setCmd</span><span class="token punctuation">(</span>Command<span class="token operator">*</span> cmd<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        command_vec_<span class="token punctuation">.</span><span class="token function">emplace_back</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">executeCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">auto</span> <span class="token operator">&amp;</span>cmd <span class="token operator">:</span> command_vec_<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            cmd<span class="token operator">-&gt;</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span>Command<span class="token operator">*</span><span class="token operator">&gt;</span> command_vec_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    GameRole<span class="token operator">*</span> role1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">GameRole</span><span class="token punctuation">(</span><span class="token string">&quot;role1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    GameRole<span class="token operator">*</span> role2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">GameRole</span><span class="token punctuation">(</span><span class="token string">&quot;role2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
    Command<span class="token operator">*</span>  moveCommand1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">MoveCommand</span><span class="token punctuation">(</span>role1<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Command<span class="token operator">*</span>  moveCommand2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">MoveCommand</span><span class="token punctuation">(</span>role1<span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Command<span class="token operator">*</span>  jumpCommand <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">JumpCommand</span><span class="token punctuation">(</span>role1<span class="token punctuation">)</span><span class="token punctuation">;</span>

    Command<span class="token operator">*</span>  moveCommand3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">MoveCommand</span><span class="token punctuation">(</span>role2<span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Command<span class="token operator">*</span>  jumpCommand2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">JumpCommand</span><span class="token punctuation">(</span>role2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    Invoker<span class="token operator">*</span> invoker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Invoker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    invoker<span class="token operator">-&gt;</span><span class="token function">setCmd</span><span class="token punctuation">(</span>moveCommand1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    invoker<span class="token operator">-&gt;</span><span class="token function">setCmd</span><span class="token punctuation">(</span>moveCommand2<span class="token punctuation">)</span><span class="token punctuation">;</span>   
    invoker<span class="token operator">-&gt;</span><span class="token function">setCmd</span><span class="token punctuation">(</span>jumpCommand<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    invoker<span class="token operator">-&gt;</span><span class="token function">setCmd</span><span class="token punctuation">(</span>moveCommand3<span class="token punctuation">)</span><span class="token punctuation">;</span>   
    invoker<span class="token operator">-&gt;</span><span class="token function">setCmd</span><span class="token punctuation">(</span>jumpCommand2<span class="token punctuation">)</span><span class="token punctuation">;</span>       
    invoker<span class="token operator">-&gt;</span><span class="token function">executeCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">delete</span> moveCommand1<span class="token punctuation">;</span>
    <span class="token keyword">delete</span> moveCommand2<span class="token punctuation">;</span>
    <span class="token keyword">delete</span> jumpCommand<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),e=[o];function c(l,i){return s(),a("div",null,e)}const k=n(t,[["render",c],["__file","command.html.vue"]]);export{k as default};
