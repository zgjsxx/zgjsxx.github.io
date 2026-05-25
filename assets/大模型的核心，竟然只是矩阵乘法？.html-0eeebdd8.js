import{_ as s,V as i,W as l,Z as e,X as n,Y as d,a0 as a}from"./framework-c954d91f.js";const t="/assets/posts/ai-tech/1779690681397-88604670-8368-4fbe-ac85-fbea5d05e1a7.png",c="/assets/posts/ai-tech/1779690814309-8787b3e0-a66b-4cba-8209-5fbb9bc804c0.png",p="/assets/posts/ai-tech/1779690726145-4b47d6d0-c905-407a-bc53-f05c4cd5c76f.png",r="/assets/posts/ai-tech/1779690858361-4682450d-0386-4779-98d1-d25767dce7e4.png",u="/assets/posts/ai-tech/1779690887065-b7aa57a0-45dd-48f3-81be-2a10f5c12f3a.png",o="/assets/posts/ai-tech/1779690910380-b352da38-2da6-408c-bfbd-702463fab37f.png",v="/assets/posts/ai-tech/1779690933795-2a0e7a6c-ccda-4c73-b5d6-7b3c01e225f1.png",m="/assets/posts/ai-tech/1779691235613-0ec5527c-f193-4d80-84ce-c16a1a985923.png",g="/assets/posts/ai-tech/1779691269294-a9f112c0-5029-4ea0-a87e-98dbae3b43f4.png",b="/assets/posts/ai-tech/1779691333349-844f059a-063b-4302-9473-71b8e74ac69a.png",x="/assets/posts/ai-tech/1779691364898-41d0ac55-4ebb-444c-8bef-62df78befeda.png",h="/assets/posts/ai-tech/1779691386197-99f3000c-a3db-418c-8676-afa8407299f4.png",k="/assets/posts/ai-tech/1779691419246-defd4c5a-4fc4-4585-a1b5-4b5ed6266214.png",f={},_=n("h1",{id:"大模型的核心-竟然只是矩阵乘法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#大模型的核心-竟然只是矩阵乘法","aria-hidden":"true"},"#"),d(" 大模型的核心，竟然只是矩阵乘法？")],-1),A=n("p",null,"今天我们经常听到这些词：",-1),C=n("p",null,"大模型、Transformer、Attention、GPU、CUDA、算力、训练、推理。",-1),B=n("p",null,"听起来都很高深。",-1),U=n("p",null,"但如果把这些概念一层一层拆开，你会发现一个很有意思的事实：",-1),P=n("p",null,[n("strong",null,"现代 AI 的核心计算，大量都是矩阵运算。")],-1),y=n("p",null,"尤其是大语言模型 LLM，不管是前向推理，还是训练时的反向传播，本质上都离不开矩阵乘法。",-1),X=n("p",null,"而 GPU 之所以能成为 AI 时代的核心硬件，也是因为它特别擅长做大规模并行矩阵计算。",-1),G=a('<figure><img src="'+t+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="一、文本进入模型后-先变成矩阵" tabindex="-1"><a class="header-anchor" href="#一、文本进入模型后-先变成矩阵" aria-hidden="true">#</a> 一、文本进入模型后，先变成矩阵</h2><p>神经网络不能直接理解文字。</p><p>比如一句话：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>我 爱 人工智能
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入模型后，每个 token 会先被转换成一个向量。</p><p>可以简单理解成：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>我       → <span class="token punctuation">[</span>0.2, 0.7, -0.1, ...<span class="token punctuation">]</span>
爱       → <span class="token punctuation">[</span>0.5, 0.1,  0.8, ...<span class="token punctuation">]</span>
人工智能 → <span class="token punctuation">[</span>0.9, 0.3,  0.6, ...<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个 token 是一个向量。</p><p>多个 token 的向量堆叠在一起，就变成了一个矩阵。</p><p>例如：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>X = <span class="token punctuation">[</span>seq_len, hidden_dim<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果一句话有 4 个 token，每个 token 用 768 维向量表示，那么：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>X = <span class="token punctuation">[</span>4, 768<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从这一刻开始，模型后面的计算几乎都围绕这个矩阵展开。</p>`,15),W=a('<figure><img src="'+c+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="二、linear-层就是矩阵乘法" tabindex="-1"><a class="header-anchor" href="#二、linear-层就是矩阵乘法" aria-hidden="true">#</a> 二、Linear 层就是矩阵乘法</h2><p>神经网络里最常见的结构叫 Linear 层，也叫全连接层。</p><p>它的计算公式是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Y = XW + b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>X：输入矩阵
W：权重矩阵
b：偏置
Y：输出矩阵
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>X: <span class="token punctuation">[</span>4, 768<span class="token punctuation">]</span>
W: <span class="token punctuation">[</span>768, 3072<span class="token punctuation">]</span>
Y: <span class="token punctuation">[</span>4, 3072<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一步其实就是一次矩阵乘法。</p><p>输入矩阵 X 乘上权重矩阵 W，得到新的输出矩阵 Y。</p><p>大模型里有大量 Linear 层，所以大模型天然就是矩阵乘法密集型程序。</p>`,12),M=a('<figure><img src="'+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="三、attention-拆开后-也是矩阵运算" tabindex="-1"><a class="header-anchor" href="#三、attention-拆开后-也是矩阵运算" aria-hidden="true">#</a> 三、Attention 拆开后，也是矩阵运算</h2><p>Transformer 最核心的模块是 Attention。</p><p>很多人觉得 Attention 很神秘，但它拆开以后，其实也是一组矩阵运算。</p><p>首先，输入矩阵 X 会分别乘上三个权重矩阵：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Q = XWq
K = XWk
V = XWv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是得到 Query、Key、Value 三个矩阵。</p><p>然后计算注意力分数：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Score = QKᵀ
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这又是一次矩阵乘法。</p><p>接着经过 softmax 得到注意力权重：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Attention = softmax(Score)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后再乘上 V：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Output = Attention × V
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以 Attention 的核心路径可以概括为：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>X
↓
Q = XWq
K = XWk
V = XWv
↓
Score = QKᵀ
↓
softmax
↓
Output = Attention × V
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看起来复杂，其实核心就是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>矩阵乘法 + softmax + 矩阵乘法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中最耗算力的部分，仍然是矩阵乘法。</p>`,19),T=a('<figure><img src="'+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="四、mlp-ffn-也是矩阵乘法" tabindex="-1"><a class="header-anchor" href="#四、mlp-ffn-也是矩阵乘法" aria-hidden="true">#</a> 四、MLP / FFN 也是矩阵乘法</h2><p>Transformer Block 里除了 Attention，还有一个非常重要的模块：MLP，也叫 FFN。</p><p>典型结构是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Y = Linear2(Activation(Linear1(X)))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>展开以后就是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>H = XW1 + b1
H = activation(H)
Y = HW2 + b2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如 hidden_dim 是 4096，中间层扩展到 11008：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>X:  <span class="token punctuation">[</span>seq_len, 4096<span class="token punctuation">]</span>
W1: <span class="token punctuation">[</span>4096, 11008<span class="token punctuation">]</span>
H:  <span class="token punctuation">[</span>seq_len, 11008<span class="token punctuation">]</span>

W2: <span class="token punctuation">[</span>11008, 4096<span class="token punctuation">]</span>
Y:  <span class="token punctuation">[</span>seq_len, 4096<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，MLP 的主要计算是两次大矩阵乘法：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>第一次：升维
第二次：降维
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>所以一个 Transformer Block 里：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Attention：矩阵乘法
MLP：矩阵乘法
输出投影：矩阵乘法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再加上几十层、上百层堆叠之后，大模型的计算量就非常可观了。</p>`,14),L=a('<figure><img src="'+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="五、推理是矩阵运算-训练也是矩阵运算" tabindex="-1"><a class="header-anchor" href="#五、推理是矩阵运算-训练也是矩阵运算" aria-hidden="true">#</a> 五、推理是矩阵运算，训练也是矩阵运算</h2><p>前面讲的是模型前向传播。</p><p>也就是输入一个问题，模型输出答案。</p><p>但训练模型时，还需要反向传播。</p><p>很多人以为反向传播是另一套完全不同的东西，其实它的核心也离不开矩阵运算。</p><p>以最简单的 Linear 层为例：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Y = XW
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>假设损失函数对输出 Y 的梯度是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>dY
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么权重 W 的梯度是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>dW = XᵀdY
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入 X 的梯度是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>dX = dYWᵀ
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你会发现：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>dW = XᵀdY
dX = dYWᵀ
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这两个仍然是矩阵乘法。</p><p>所以训练过程可以理解为：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>前向传播：大量矩阵乘法
反向传播：大量矩阵乘法
参数更新：根据梯度更新矩阵
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是为什么训练大模型需要极高算力。</p><p>因为训练不是只算一遍前向传播，而是还要计算大量梯度。</p>`,21),S=a('<figure><img src="'+o+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="六、gpu-为什么特别适合-ai" tabindex="-1"><a class="header-anchor" href="#六、gpu-为什么特别适合-ai" aria-hidden="true">#</a> 六、GPU 为什么特别适合 AI？</h2><p>CPU 很强，但它更像一个“少量核心、每个核心很聪明”的处理器。</p><p>它擅长：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>复杂逻辑
分支判断
任务调度
操作系统
数据库
业务程序
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如 CPU 里有很多硬件机制：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>分支预测
乱序执行
复杂缓存
高单核性能
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些能力让 CPU 很适合处理复杂控制逻辑。</p><p>GPU 则不同。</p><p>GPU 更像一个“大量计算单元组成的并行工厂”。</p><p>它不擅长复杂分支，但特别擅长大量相似计算。</p><p>矩阵乘法刚好非常适合 GPU。</p><p>比如计算：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>C = A × B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>矩阵 C 里的每一个元素都可以相对独立地计算：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>C<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> = A 的第 i 行 · B 的第 j 列
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也就是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>C<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> = A<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>0<span class="token punctuation">]</span>B<span class="token punctuation">[</span>0<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span>
        + A<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>1<span class="token punctuation">]</span>B<span class="token punctuation">[</span>1<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span>
        + A<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>2<span class="token punctuation">]</span>B<span class="token punctuation">[</span>2<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span>
        + ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>矩阵 C 有成千上万个元素，每个元素都可以分配给不同线程去算。</p><p>所以 GPU 的优势不是一个人算完整张表，而是一群线程同时算很多格子。</p>`,20),V=a('<figure><img src="'+v+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="七、cuda-怎么组织-gpu-并行" tabindex="-1"><a class="header-anchor" href="#七、cuda-怎么组织-gpu-并行" aria-hidden="true">#</a> 七、CUDA 怎么组织 GPU 并行？</h2><p>在 CUDA 里，程序不是直接说“让 GPU 帮我算”。</p><p>它会把任务切成很多层：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Grid
 ├── Block
 │    ├── Thread
 │    ├── Thread
 │    └── ...
 ├── Block
 └── ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个 CUDA kernel 启动时，通常会写成：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>kernel<span class="token operator">&lt;&lt;</span><span class="token operator">&lt;</span>blocks<span class="token punctuation">,</span> threads<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>比如：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>vectorAdd<span class="token operator">&lt;&lt;</span><span class="token operator">&lt;</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>意思是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>启动 4 个 block
每个 block 有 256 个 thread
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>而 GPU 硬件里真正执行计算的是 SM，也就是 Streaming Multiprocessor。</p><p>可以简单理解成：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>GPU = 很多个 SM
SM = 一个小型计算工厂
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>CUDA block 会被调度到 SM 上执行。</p><p>一个 block 不会跨多个 SM。</p><p>但一个 SM 可以同时驻留多个 block，并在这些 block 的 warp 之间切换执行。</p><p>这里还有一个重要概念：warp。</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>1 warp = 32 个线程
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>GPU 实际调度时，不是一个线程一个线程调度，而是按 warp 调度。</p><p>所以可以这样理解：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Block 被分配到 SM
Block 里的 Thread 被分成 Warp
SM 实际调度 Warp 执行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),Y=a('<figure><img src="'+m+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="八、最直接的矩阵乘法为什么不够快" tabindex="-1"><a class="header-anchor" href="#八、最直接的矩阵乘法为什么不够快" aria-hidden="true">#</a> 八、最直接的矩阵乘法为什么不够快？</h2><p>最直接的矩阵乘法代码是这样的：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> M<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> N<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> k <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> k <span class="token operator">&lt;</span> K<span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            C<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+=</span> A<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">*</span> B<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个写法很直观。</p><p>但在 GPU 上，真正的问题不只是“要算多少次乘加”。</p><p>还有一个更重要的问题：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>数据从哪里来？
数据要搬多少次？
数据能不能被复用？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GPU 上的 global memory，也就是显存，容量很大，但访问速度相对慢。</p><p>而 SM 内部的 shared memory 很快，但容量很小。</p>`,10),K=a('<figure><img src="'+g+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果每个线程都反复从 global memory 读取 A 和 B 的元素，性能会被内存访问拖慢。</p><p>所以 CUDA 优化矩阵乘法时，经常会使用一个核心技巧：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Tile 分块计算
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="九、什么是-tile-分块" tabindex="-1"><a class="header-anchor" href="#九、什么是-tile-分块" aria-hidden="true">#</a> 九、什么是 Tile 分块？</h2><p>假设要计算：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>C = A × B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们不一次性处理整个大矩阵，而是把矩阵切成很多小块。</p><p>比如把 C 切成 16×16 的小块：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>C tile = 16 × 16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每个 CUDA block 负责计算 C 的一个小块。</p><p>为了算出这个 C tile，需要从 A 中取一块，从 B 中取一块：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>A tile × B tile → 累加到 C tile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果 K 维很长，就沿着 K 方向一块一块推进：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>第 1 轮：A_tile_0 × B_tile_0
第 2 轮：A_tile_1 × B_tile_1
第 3 轮：A_tile_2 × B_tile_2
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后累加得到 C tile。</p><p>所以 Tile 优化的核心思想是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>先把 A、B 的小块搬到 shared memory，
然后 block 内的线程反复复用这些数据，
从而减少对 global memory 的访问。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),z=a('<figure><img src="'+b+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="十、一个-4×4-的直观例子" tabindex="-1"><a class="header-anchor" href="#十、一个-4×4-的直观例子" aria-hidden="true">#</a> 十、一个 4×4 的直观例子</h2><p>假设：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>A: 4 × 4
B: 4 × 4
C: 4 × 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把 tile 大小设成 2×2。</p><p>那么 C 会被分成 4 个小块：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>C00  C01
C10  C11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 C00 是左上角的 2×2 小矩阵。</p><p>为了计算 C00，需要：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>A 的前 2 行
B 的前 2 列
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但矩阵乘法还要沿着 K 方向累加。</p><p>所以 C00 的计算过程是：</p><p>第一轮：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>A00 × B00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二轮：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>A01 × B10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>两轮结果累加，得到：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>C00 = A00 × B00 + A01 × B10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同理：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>C01 = A00 × B01 + A01 × B11
C10 = A10 × B00 + A11 × B10
C11 = A10 × B01 + A11 × B11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>不是 A 的一个 tile 只和 B 的一个 tile 相乘，
而是 A 沿 K 方向的多个 tile，
要依次和 B 对应位置的多个 tile 相乘，
最后把结果累加起来。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),j=a('<figure><img src="'+x+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="十一、为什么-tile-能提升性能" tabindex="-1"><a class="header-anchor" href="#十一、为什么-tile-能提升性能" aria-hidden="true">#</a> 十一、为什么 Tile 能提升性能？</h2><p>Tile 优化的核心不是减少数学计算量。</p><p>矩阵乘法该做多少乘加，还是要做多少乘加。</p><p>它真正优化的是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>减少慢速内存访问
提高数据复用率
让更多线程并行工作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如 A 的一个 tile 被加载到 shared memory 后，block 内多个线程都会反复使用它。</p><p>B 的 tile 也是一样。</p><p>这样就避免了每个线程都重复从 global memory 读取同样的数据。</p><p>可以把它理解成：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>global memory：仓库，很大但取货慢
shared memory：车间缓存，很小但取货快
register：手里正在用的工具，最快但最小
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Tile 优化就是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>先把常用材料从仓库搬到车间，
大家在车间里反复使用，
不用每算一步都跑回仓库。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是 GPU 优化里非常重要的思想：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>数学公式没有变，
但计算组织方式变了。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,15),w=a('<figure><img src="'+h+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="十二、从-tile-到-flashattention" tabindex="-1"><a class="header-anchor" href="#十二、从-tile-到-flashattention" aria-hidden="true">#</a> 十二、从 Tile 到 FlashAttention</h2><p>回到大模型。</p><p>大模型中的 Attention、MLP、Embedding 投影、输出投影，背后都有大量矩阵乘法。</p><p>训练时的梯度计算，同样是大量矩阵乘法。</p><p>所以大模型的性能，很大程度取决于：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>矩阵乘法算得够不够快
显存访问够不够高效
并行度够不够高
GPU 利用率够不够满
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CUDA、cuBLAS、Tensor Core、FlashAttention、PagedAttention 等优化，本质上都在围绕这些问题展开。</p><p>比如 FlashAttention 不是改变 Attention 的数学公式。</p><p>Attention 还是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>softmax(QKᵀ)V
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但普通 Attention 可能会把完整的 QKᵀ 注意力矩阵写到显存里，再读出来做 softmax，再写回，再读出来乘 V。</p><p>这样会产生大量 HBM 显存读写。</p><p>FlashAttention 的核心思路是：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>把 Q、K、V 分块
在 SRAM / shared memory 中局部计算
一边做 softmax
一边乘 V
尽量不保存完整的 N×N 注意力矩阵
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>数学公式没有变，
但数据搬运路径变了。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这和 Tile 矩阵乘法的思想非常像。</p>`,18),D=a('<figure><img src="'+k+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="十三、总结" tabindex="-1"><a class="header-anchor" href="#十三、总结" aria-hidden="true">#</a> 十三、总结</h2><p>现代 AI 模型看起来非常复杂。</p><p>但从计算角度看，它的核心可以总结为一句话：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>大模型 = 海量参数矩阵 + 大规模矩阵运算 + GPU 并行优化
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>LLM 前向传播时：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Attention 是矩阵运算
MLP 是矩阵运算
Linear 投影是矩阵运算
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>训练反向传播时：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>梯度计算还是矩阵运算
参数更新也是围绕矩阵进行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>而 GPU / CUDA 的作用，就是把这些矩阵运算切分成大量小任务，让成千上万个线程一起并行计算。</p><p>所以理解大模型计算，矩阵乘法是第一步。</p><p>理解 GPU 加速，Tile 分块是第一步。</p><p>如果你再继续往下看，就会发现：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>Tensor Core 是为了更快地算矩阵乘法；
cuBLAS 是高度优化的矩阵乘法库；
FlashAttention 是 Attention 里的分块计算优化；
PagedAttention 是 KV Cache 管理上的内存优化。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很多看似高级的 AI 系统优化，背后其实都绕不开同一个问题：</p><div class="language-latex line-numbers-mode" data-ext="latex"><pre class="language-latex"><code>怎么算得更快？
怎么少搬数据？
怎么把 GPU 喂饱？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大模型看起来像是在“理解语言”。</p><p>但从硬件视角看，它其实是在一层又一层地做矩阵乘法。</p><p>智能的表象背后，是海量矩阵、海量数据搬运，以及 GPU 上成千上万个线程的并行计算。</p><p><strong>当你真正理解了矩阵乘法，你就已经摸到了现代 AI 计算的地基。</strong></p><p><strong>当你真正理解了 Tile 分块，你就已经拿到了理解 GPU 加速的第一把钥匙。</strong></p>`,21);function F(N,Q){return i(),l("div",null,[_,A,C,B,U,P,y,X,e(" 这是一张图片，ocr 内容为： "),G,e(" 这是一张图片，ocr 内容为： "),W,e(" 这是一张图片，ocr 内容为： "),M,e(" 这是一张图片，ocr 内容为： "),T,e(" 这是一张图片，ocr 内容为： "),L,e(" 这是一张图片，ocr 内容为： "),S,e(" 这是一张图片，ocr 内容为： "),V,e(" 这是一张图片，ocr 内容为： "),Y,e(" 这是一张图片，ocr 内容为： "),K,e(" 这是一张图片，ocr 内容为： "),z,e(" 这是一张图片，ocr 内容为： "),j,e(" 这是一张图片，ocr 内容为： "),w,e(" 这是一张图片，ocr 内容为： "),D])}const H=s(f,[["render",F],["__file","大模型的核心，竟然只是矩阵乘法？.html.vue"]]);export{H as default};
