import{_ as i,V as t,W as n,X as a,Y as r,$ as l,a0 as d,F as o}from"./framework-9a29aaa0.js";const s={},h=d('<ul><li><a href="#raft%E7%AE%97%E6%B3%95">raft算法</a><ul><li><a href="#3-paxos%E7%9A%84%E9%97%AE%E9%A2%98">3. Paxos的问题</a></li><li><a href="#4-%E9%9D%A2%E5%90%91%E5%8F%AF%E7%90%86%E8%A7%A3%E6%80%A7%E7%9A%84%E8%AE%BE%E8%AE%A1">4. 面向可理解性的设计</a></li><li><a href="#5-raft%E4%B8%80%E8%87%B4%E6%80%A7%E7%AE%97%E6%B3%95">5. raft一致性算法</a><ul><li><a href="#51-raft%E7%AE%97%E6%B3%95%E5%9F%BA%E7%A1%80">5.1 raft算法基础</a><ul><li><a href="#511-raft%E7%8A%B6%E6%80%81%E6%9C%BA">5.1.1 raft状态机</a></li><li><a href="#512-raft%E4%BB%BB%E6%9C%9F">5.1.2 raft任期</a></li><li><a href="#513-raft%E8%8A%82%E7%82%B9%E9%80%9A%E8%AE%AF">5.1.3 raft节点通讯</a></li></ul></li><li><a href="#52-leader%E9%80%89%E4%B8%BE">5.2 Leader选举</a><ul><li><a href="#521-%E9%80%89%E4%B8%BE%E8%BF%87%E7%A8%8B">5.2.1 选举过程</a></li><li><a href="#522-%E9%80%89%E4%B8%BE%E6%88%90%E5%8A%9F%E7%9A%84%E6%9D%A1%E4%BB%B6">5.2.2 选举成功的条件</a></li></ul></li><li><a href="#523-%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E6%97%A0%E9%99%90%E5%BE%AA%E7%8E%AF%E7%9A%84%E6%8A%95%E7%A5%A8%E5%88%86%E8%A3%82">5.2.3 如何避免无限循环的投票分裂</a></li><li><a href="#53-%E6%97%A5%E5%BF%97%E5%A4%8D%E5%88%B6">5.3 日志复制</a><ul><li><a href="#531-%E5%A4%8D%E5%88%B6%E7%9A%84%E6%B5%81%E7%A8%8B">5.3.1 复制的流程</a></li><li><a href="#532-%E6%97%A5%E5%BF%97%E7%9A%84%E7%BB%84%E7%BB%87%E6%96%B9%E5%BC%8F">5.3.2 日志的组织方式</a></li><li><a href="#533-%E6%8F%90%E4%BA%A4%E6%97%A5%E5%BF%97">5.3.3 提交日志</a></li><li><a href="#534-%E5%8C%B9%E9%85%8D%E6%97%A5%E5%BF%97">5.3.4 匹配日志</a></li></ul></li><li><a href="#535-%E6%97%A5%E5%BF%97%E4%B8%8D%E4%B8%80%E8%87%B4%E7%9A%84%E5%9C%BA%E6%99%AF">5.3.5 日志不一致的场景</a><ul><li><a href="#536-%E9%81%BF%E5%85%8D-log-%E4%B8%8D%E4%B8%80%E8%87%B4appendentries-%E4%B8%AD%E7%9A%84%E4%B8%80%E8%87%B4%E6%80%A7%E6%A3%80%E6%9F%A5">5.3.6 避免 log 不一致：AppendEntries 中的一致性检查</a></li></ul></li><li><a href="#54-%E5%AE%89%E5%85%A8%E6%80%A7">5.4 安全性</a><ul><li><a href="#541-%E9%99%90%E5%88%B6%E4%B8%80%E5%8C%85%E5%90%AB%E6%89%80%E6%9C%89%E5%B7%B2%E6%8F%90%E4%BA%A4-entry-%E7%9A%84%E8%8A%82%E7%82%B9%E6%89%8D%E8%83%BD%E8%A2%AB%E9%80%89%E4%B8%BA-leader">5.4.1 限制一：包含所有已提交 entry 的节点才能被选为 leader</a></li></ul></li></ul></li><li><a href="#%E9%97%AE%E9%A2%98">问题</a><ul><li><a href="#raft%E7%AE%97%E6%B3%95%E6%9C%89%E6%B2%A1%E6%9C%89%E5%8F%AF%E8%83%BD%E6%9C%89%E5%A4%9A%E4%B8%AAcandidate%E5%90%8C%E6%97%B6%E8%8E%B7%E5%BE%97%E4%BA%86%E5%A4%9A%E6%95%B0%E7%A5%A8">raft算法，有没有可能有多个candidate同时获得了多数票？</a></li><li><a href="#raft%E7%AE%97%E6%B3%95%E4%B8%AD%E8%8A%82%E7%82%B9%E6%A0%B9%E6%8D%AE%E4%BB%80%E4%B9%88%E8%A7%84%E5%88%99%E6%8A%95%E7%A5%A8">raft算法中，节点根据什么规则投票?</a></li></ul></li><li><a href="#%E8%B5%84%E6%BA%90">资源</a></li></ul></li></ul><h1 id="raft算法" tabindex="-1"><a class="header-anchor" href="#raft算法" aria-hidden="true">#</a> raft算法</h1><h2 id="_3-paxos的问题" tabindex="-1"><a class="header-anchor" href="#_3-paxos的问题" aria-hidden="true">#</a> 3. Paxos的问题</h2><p>在过去十年间，莱斯利・兰伯特（Leslie Lamport）的 <strong>Paxos 协议</strong>几乎成了<strong>共识算法</strong>（consensus）的代名词：它是课程中最常讲授的协议，而且大多数共识实现都将其作为起始点。</p><p>Paxos 首先定义了一个能够就单个决策（例如单个复制日志条目）达成一致的协议。我们将这个子集称为单决议 Paxos（single - decree Paxos）。然后，Paxos 组合该协议的多个实例以促成一系列决策，例如日志（多 Paxos，multi - Paxos）。Paxos 确保安全性和活性（liveness），并且支持集群成员关系的变更。其正确性已得到证明，而且在正常情况下是高效的。</p><p>Paxos算法的缺点如下：</p><ul><li>第一个缺点是 Paxos 是出了名的难以理解。</li><li>第二个缺点没有考虑真实系统的实现，很难用于实际系统。</li></ul><p>基于上述问题，作者认为Paxos既不能为开发真实系统提供良好的基础，又不适用于教学。而考虑到大型软件系统中共识的重要性，我们决定自己设计一种替代 Paxos、有更好特性的共识算法。Raft 就是这一实验的产物。</p><h2 id="_4-面向可理解性的设计" tabindex="-1"><a class="header-anchor" href="#_4-面向可理解性的设计" aria-hidden="true">#</a> 4. 面向可理解性的设计</h2><p>设计 Raft 时我们有几个目标：</p><ul><li>必须为构建真实系统提供完整基础，能显著降低系统开发者所需的设计工作；</li><li>必须在所有情况下确保安全（不会导致冲突），在典型场景下确保可用；</li><li>对于常见操作必须很高效，</li><li>必须确保可理解性（understandability），这才是我们最重要的目标，同时也是最大的挑战。</li></ul><h2 id="_5-raft一致性算法" tabindex="-1"><a class="header-anchor" href="#_5-raft一致性算法" aria-hidden="true">#</a> 5. raft一致性算法</h2><h3 id="_5-1-raft算法基础" tabindex="-1"><a class="header-anchor" href="#_5-1-raft算法基础" aria-hidden="true">#</a> 5.1 raft算法基础</h3><h4 id="_5-1-1-raft状态机" tabindex="-1"><a class="header-anchor" href="#_5-1-1-raft状态机" aria-hidden="true">#</a> 5.1.1 raft状态机</h4><p>一个 Raft 集群包含若干个服务器；通常有五个，这使得系统可以容忍两个节点发生故障。</p><p>在任何特定时间，每个服务器都处于三种状态之一：<strong>领导者</strong>（leader）、<strong>跟随者</strong>（follower）或者<strong>候选者</strong>（candidate）。</p><ul><li>在正常运行时，只有<strong>一个领导者</strong>，其他所有服务器<strong>都是跟随者</strong>。</li><li>跟随者是被动的，它们自身不发出请求，而只是响应来自领导者和候选者的请求。</li><li>领导者处理所有客户端请求， 如果客户端与一个跟随者联系，跟随者会将<strong>其重定向到领导者</strong>。</li><li>候选者是一个特殊状态，用于选举新的领导者。</li></ul><p>下图展示了这些状态及其转换：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/lesson/6.824/raft-server-state.png" alt="raft服务器状态" tabindex="0" loading="lazy"><figcaption>raft服务器状态</figcaption></figure><h4 id="_5-1-2-raft任期" tabindex="-1"><a class="header-anchor" href="#_5-1-2-raft任期" aria-hidden="true">#</a> 5.1.2 raft任期</h4><p>下一个要介绍的概念是<strong>任期</strong>。Raft 算法将时间划分为任意长度的任期，任期用<strong>连续的整数编号</strong>。每个任期都以一次选举开始，在选举中，一个或多个候选人尝试成为领导者。如果一个候选人在选举中获胜，那么它将在该任期的剩余时间里担任领导者。在某些情况下，选举会导致选票分散。在这种情况下，该任期将结束且没有领导者；一个新的任期（伴随着新的选举）很快就会开始。Raft 算法确保在一个特定任期内最多只有一个领导者。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/lesson/6.824/raft-term.png" alt="raft任期" tabindex="0" loading="lazy"><figcaption>raft任期</figcaption></figure><p>关于raft，有以下几点需要说明：</p><ul><li>每个任期的开始都是从<strong>选举</strong>开始，选举时可能有多个都试图成为leader。</li><li>某个candidate赢得选举之后，就会成为该任期内的leader。</li><li>每个节点都记录了当前的<strong>任期号</strong>（currentTerm），这个编号时随着时间单调递增。</li><li>节点通信时，会带上自己的任期号 <ul><li>如果自己的任期号小于其他节点的，要立即将自己的任期号更新为更大的任期号。</li><li>如果一个candidate或leader发现自己的任期过期了，要立即切换到follower状态。</li><li>如果一个节点收到了携带过期任期编号的请求，会拒绝这个请求。</li></ul></li></ul><h4 id="_5-1-3-raft节点通讯" tabindex="-1"><a class="header-anchor" href="#_5-1-3-raft节点通讯" aria-hidden="true">#</a> 5.1.3 raft节点通讯</h4><p>raft服务器RPC进行通讯，主要通讯交互是两种：</p><ul><li>RequestVote： 由candidates在选举期间发起</li><li>AppendEntries： 由leader发起，用于复制日志条目以及提供一种心跳（heartbeat）形式。</li></ul><h3 id="_5-2-leader选举" tabindex="-1"><a class="header-anchor" href="#_5-2-leader选举" aria-hidden="true">#</a> 5.2 Leader选举</h3><p>Raft 使用<strong>心跳机制</strong>来触发领导者选举。</p><ul><li>当服务器启动时，它们以跟随者（follower）状态开始。只要服务器从领导者或候选人那里接收到有效的远程过程调用（RPC），它就会保持在跟随者状态。</li><li>领导者会定期向所有跟随者发送心跳（空的AppendEntries消息）以维护其权威性。</li><li>如果一个跟随者在一段称为选举超时（election timeout）的时间内没有收到任何通信，那么它会假定没有有效的领导者，并开始进行选举以选出新的领导者。</li></ul><h4 id="_5-2-1-选举过程" tabindex="-1"><a class="header-anchor" href="#_5-2-1-选举过程" aria-hidden="true">#</a> 5.2.1 选举过程</h4><p>对于一个follower，当其发生选举超时时，将开始选举，具体过程如下</p><ul><li>增加它的当前任期</li><li>将状态机切换到candidate状态。</li><li>然后选举自己作为leader，同时并发地向集群其他节点发送RequestVote RPC</li></ul><p>对于该follower，其选举结果可能由如下三种：</p><ul><li>该follower赢得此次选举，成为leader</li><li>另一个节点赢得此次选举，成为leader</li><li>选举超时，没有产生有效leader</li></ul><h4 id="_5-2-2-选举成功的条件" tabindex="-1"><a class="header-anchor" href="#_5-2-2-选举成功的条件" aria-hidden="true">#</a> 5.2.2 选举成功的条件</h4><p>如果候选人在同一任期内获得了整个集群中<strong>大多数服务器</strong>的选票，它就赢得了选举。在给定的任期内，每个服务器最多为一个候选人投票，遵循<strong>先到先得</strong>的原则。多数原则确保了在特定任期内最多只有一个候选人能够赢得选举。一旦候选人赢得选举，它就成为领导者。然后它向所有其他服务器发送心跳消息以确立其权威并防止新的选举。</p><p>在等待投票期间，一个 candidate 可能会从其他服务器收到一个 AppendEntries RPC 声称自己是 leader。这个 leader 的任期 term 包含在 RPC 消息中，根据term值，分两种情况处理：</p><ul><li>该term大于等于这个 candidate 的 currentTerm：那该 candidate 就承认 这个 leader 是合法的，然后回归到 follower 状态。</li><li>该term小于这个 candidate 的 currentTerm：拒绝这个 RPC ，仍然留在 candidate 状态。</li></ul><p>第 3 种可能的结果是：该 candidate 既没有赢得也没有输掉这次选举。 如果多个 followers 在同一时间成为 candidates，投票就会很分散，最终没有谁能赢得大多数选票。 当发生这种情况时，每个 candidate 都会超时，然后各自增大 term 并给其他节点发送 RequestVote 请求，开始一轮新选举， 但如果没有额外的预防措施，<strong>这种投票分裂的情况看可能会无限持续下去</strong>。</p><h3 id="_5-2-3-如何避免无限循环的投票分裂" tabindex="-1"><a class="header-anchor" href="#_5-2-3-如何避免无限循环的投票分裂" aria-hidden="true">#</a> 5.2.3 如何避免无限循环的投票分裂</h3><p>Raft 使用<strong>随机化的选举超时时间</strong>来确保选票分散（split votes）的情况很少发生并且能够被快速解决。</p><p>为了从一开始就防止选票分散的情况，选举超时时间是从一个固定区间（例如，150 - 300 毫秒）中随机选择的。这样可以分散服务器的超时时间，使得在大多数情况下只有一台服务器会超时；这台服务器赢得选举并在其他服务器超时之前发送心跳信息。同样的机制也被用于处理选票分散的情况。每个候选人在选举开始时重新启动其随机化的选举超时时间，并在该超时时间结束后才开始下一次选举；这降低了在新选举中再次出现选票分散的可能性。9.3 节表明这种方法可以快速选出领导者。</p><p>作者这里提到了曾经设计过使用排名系统来解决选票分散问题，即每个候选人被分配一个唯一的排名，该排名用于在相互竞争的候选人之间进行选择。如果一个候选人发现另一个具有更高排名的候选人，它将返回跟随者状态，以便更高排名的候选人可以更容易地赢得下一次选举。但是这种方法在可用性方面产生了一些微妙的问题。如果高排名的服务器出现故障，低排名的服务器可能需要超时并再次成为候选人，但如果它太快这样做，可能会重置选举领导者的进度）。我们对该算法进行了多次调整，但每次调整后都会出现新的极端情况。最终我们得出结论，随机重试方法更加直观和易于理解。</p><p>综上所述，作者选择了使用<strong>随机化选举超时时间</strong>解决选票分散问题。</p><h3 id="_5-3-日志复制" tabindex="-1"><a class="header-anchor" href="#_5-3-日志复制" aria-hidden="true">#</a> 5.3 日志复制</h3><h4 id="_5-3-1-复制的流程" tabindex="-1"><a class="header-anchor" href="#_5-3-1-复制的流程" aria-hidden="true">#</a> 5.3.1 复制的流程</h4><p>一旦选举出领导者，它就开始处理客户端请求。每个客户端请求都包含一个要由复制状态机执行的命令。领导者将该命令作为新条目追加到其日志中，然后并行地向其他每个服务器发出附加条目（AppendEntries）RPC 以复制该条目。当该条目已被安全复制（如下所述）时，领导者将该条目应用于其状态机，并将该执行结果返回给客户端。如果跟随者崩溃或运行缓慢，或者网络数据包丢失，领导者会无限期地重试附加条目 RPC（即使在它已经响应客户端之后），直到所有跟随者最终存储所有日志条目。</p><h4 id="_5-3-2-日志的组织方式" tabindex="-1"><a class="header-anchor" href="#_5-3-2-日志的组织方式" aria-hidden="true">#</a> 5.3.2 日志的组织方式</h4><p>日志的组织方式下图所示。每个日志条目存储一个状态机命令，以及该条目被领导者接收时的任期编号。日志条目中的任期编号用于检测日志之间的不一致性。每个日志条目还拥有一个整数索引，用于标识其在日志中的位置。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/lesson/6.824/raft-logs-entries.png" alt="raft日志项" tabindex="0" loading="lazy"><figcaption>raft日志项</figcaption></figure><h4 id="_5-3-3-提交日志" tabindex="-1"><a class="header-anchor" href="#_5-3-3-提交日志" aria-hidden="true">#</a> 5.3.3 提交日志</h4><p>Raft 协议保证已提交的条目是持久化的，并且最终将由所有可用的状态机执行。</p><p>日志可以被提交的前提是该日志已经被复制到大多数服务器上(半数以上)。</p><p>5.4节会讨论leader变更之后应用这个规则时的情况，那时将会看到这种对于 commit 的定义也是安全的。</p><h4 id="_5-3-4-匹配日志" tabindex="-1"><a class="header-anchor" href="#_5-3-4-匹配日志" aria-hidden="true">#</a> 5.3.4 匹配日志</h4><p>如果不同 log 中的两个 entry 有完全相同的 index 和 term， 那么意味着：</p><ul><li>这两个 entry 一定包含了相同的命令</li><li>在所有前面的条目中这些日志都是相同的。</li></ul><h3 id="_5-3-5-日志不一致的场景" tabindex="-1"><a class="header-anchor" href="#_5-3-5-日志不一致的场景" aria-hidden="true">#</a> 5.3.5 日志不一致的场景</h3><p>正常情况下，leader 和 follower 的 log 能保持一致，但 leader 挂掉会导致 log 不一致 （leader 还未将其 log 中的 entry 都复制到其他节点就挂了）。 这些不一致会导致一系列复杂的 leader 和 follower crash。 Figure 7 展示了 follower log 与新的 leader log 的几种可能不同：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/lesson/6.824/raft-log-not-consistent-case.png" alt="raft日志不一致的场景" tabindex="0" loading="lazy"><figcaption>raft日志不一致的场景</figcaption></figure><p>在上图中：</p><ul><li>每个方框代表一个日志项</li><li>a-b代表follower缺失了部分日志</li><li>c-d代表follower产生了额外的未提交日志</li><li>e-f既缺失日志又产生了未提交日志</li></ul><p>上图中f的场景可能是这样的：服务器是<strong>任期2</strong>的领导者，在其日志中添加了若干条目，然后在提交任何条目之前崩溃；它迅速重启，成为<strong>任期3</strong>的领导者，并在其日志中又添加了一些条目；在任期2或任期3的任何条目被提交之前，该服务器再次崩溃，并在之后的几个任期内一直处于宕机状态。</p><h4 id="_5-3-6-避免-log-不一致-appendentries-中的一致性检查" tabindex="-1"><a class="header-anchor" href="#_5-3-6-避免-log-不一致-appendentries-中的一致性检查" aria-hidden="true">#</a> 5.3.6 避免 log 不一致：AppendEntries 中的一致性检查</h4><p>Raft 处理不一致的方式是强制 follower 复制一份 leader 的 log， 这意味着 follower log 中冲突的 entry 会被 leader log 中的 entry 覆盖。 Section 5.4 将会看到再加上另一个限制条件后，这个日志复制机制就是安全的。</p><p>解决冲突的具体流程：</p><ul><li>找到 leader 和 follower 的最后一个共同认可的 entry，</li><li>将 follower log 中从这条 entry 开始往后的 entries 全部删掉，</li><li>将 leader log 中从这条记录开始往后的所有 entries 同步给 follower</li></ul><h3 id="_5-4-安全性" tabindex="-1"><a class="header-anchor" href="#_5-4-安全性" aria-hidden="true">#</a> 5.4 安全性</h3><h4 id="_5-4-1-限制一-包含所有已提交-entry-的节点才能被选为-leader" tabindex="-1"><a class="header-anchor" href="#_5-4-1-限制一-包含所有已提交-entry-的节点才能被选为-leader" aria-hidden="true">#</a> 5.4.1 限制一：包含所有已提交 entry 的节点才能被选为 leader</h4><p>在任何基于 leader 的共识算法中，leader 最终都必须存储了所有的已提交 entry。</p><p>在某些共识算法中，例如<strong>Viewstamped Replication</strong>，一个节点即使并未包含全部的 已提交 entries 也仍然能被选为 leader。这些算法有特殊的机制来识别缺失 entries， 并在选举期间或选举结束后立即发送给新 leader。不幸的是，这会导致额外的复杂性。</p><p>Raft 采取了一种更简单的方式：除非前面所有 term 内的已提交 entry 都已经 在某个节点上了，否则这个节点不能被选为 leader（后面将介绍如何保证这一点）。 这意味着无需从 non-leader 节点向 leader 节点同步数据，换句话说 log entries 只会从 leader 到 follower 单向流动。</p><p>那这个是怎么做到的呢？通过投票过程。</p><p>首先，刚才已经提到，除非 log 中已经包含了集群的所有已提交 entries，否则一个 candidate 是不能被选为 leader 的。 其次，还活着的（即参与选举的）节点中，至少有一个节点保存了集群的所有已提交 entries （因为覆盖大多数节点的 entry，才算是提交成功的）。 那么，只要一个 candidate 的 log 与大多数节点相比至少不落后（at least as up-to-date，这个词下文会有精确定义），那它就持有了集群的所有已提交记录。 因此，只要能确保这里提到的“至少不落后”语意，就能确保选出来的 leader 拥有集群的所有已提交 entries。 RequestVote RPC 实现了这个过程：请求中包含了发送方的 log 信息，如果当前 节点自己的 log 比对方的更新，会拒绝对方成为 leader 的请求。具体到实现上， 判断哪个 log 更加新，依据的是最后一个 entry 的 index 和 term：</p><ul><li>如果 term 不同，那 term 新的那个 log 胜出；</li><li>如果 term 相同，那 index 更大（即更长）的那个 log 胜出。</li></ul><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><h3 id="raft算法-有没有可能有多个candidate同时获得了多数票" tabindex="-1"><a class="header-anchor" href="#raft算法-有没有可能有多个candidate同时获得了多数票" aria-hidden="true">#</a> raft算法，有没有可能有多个candidate同时获得了多数票？</h3><p>在 Raft 共识算法中，多个 candidate 节点同时获得多数票的情况是不可能的。</p><p>主要有两个原因：</p><ul><li>单一投票规则</li></ul><p>在每一轮选举（即每个任期 term）中，每个节点只能投票给一个 candidate。因此，一个节点不可能同时把票投给两个不同的 candidate。这意味着，多个 candidate 要同时获得多数票，在逻辑上是互斥的。</p><ul><li>选举时间随机化</li></ul><p>每个节点的 Election Timeout 是随机的，因此不同节点转变为 candidate 并发起选举的时间点通常不会相同。由于超时时间不同，首先发起选举的 candidate 很可能已经赢得了选举，其他节点在同一轮投票中无法再成为 leader。</p><h3 id="raft算法中-节点根据什么规则投票" tabindex="-1"><a class="header-anchor" href="#raft算法中-节点根据什么规则投票" aria-hidden="true">#</a> raft算法中，节点根据什么规则投票?</h3><p>节点在投票时遵循以下规则：</p><ul><li>每个任期内只能投出一票：节点在任期内只能投给一个候选者。如果已经给一个候选者投过票，即使后来有其他候选者发出请求，节点也不会改变投票。</li><li>只有日志最新的候选者才能获得选票：节点会比较候选人的日志和自己的日志，确保候选人的日志不落后于自己的日志。</li><li>候选人的任期必须大于等于自己的任期：如果候选人的任期小于当前节点的任期，节点会拒绝投票。</li></ul><h2 id="资源" tabindex="-1"><a class="header-anchor" href="#资源" aria-hidden="true">#</a> 资源</h2>',88),E={href:"https://raft.github.io/",target:"_blank",rel:"noopener noreferrer"},f={href:"http://arthurchiao.art/blog/raft-paper-zh/",target:"_blank",rel:"noopener noreferrer"};function p(c,g){const e=o("ExternalLinkIcon");return t(),n("div",null,[h,a("ul",null,[a("li",null,[a("a",E,[r("raft官方动画"),l(e)])]),a("li",null,[a("a",f,[r("http://arthurchiao.art/blog/raft-paper-zh/"),l(e)])])])])}const A=i(s,[["render",p],["__file","lesson5-7-raft.html.vue"]]);export{A as default};
