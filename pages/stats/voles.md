<!-- Mathew Titus -->
<!-- Sunstrand TC -->
<!-- 2/7/2024 -->

# Red Voles

## Vole Nesting

It is widely thought that voles primarily nest in old growth forest, but they have been sighted in nearby younger forest. The nests may be actively occupied, abandoned, etc.

## Nesting Research

In order to quantify the voles occupancy in younger forests a multi-year survey has been conducted by researchers at OSU, NCRS?

A large stretch of Western Oregon, from Coos Bay to ??? was split into four geographic study regions: North, North Central, South Central, South. Each region has old growth forest with nearby younger forest, with nearly uniform age. Stands were selected in each region to have samples across forest ages (80+, 60-80, 50-60, ..., 20-30 years) and distances to old growth, classified as near (\( \leq \) 1km) or far (1 - 5km).

## Data Collection

A pair of researchers would select a random collection of plots (roughly ten) within the stand of interest. The plots were fixed radius (7.8 meters), selected by ... These plots would be surveyed from ground level for nests, and upon sighting a potential nest site, a tree would be climbed to verify the nest, record occupancy state (occupied, recently occupied, vacated), tree characteristics, and scan the neighboring canopy for additional nests.

A small number of the plots were designated as climb plots, meaning that the researchers would climb a number of trees regardless of the presence of vole nests. The trees climbed were chosen for climbing safety and vantage, so that the climbers could confidently say they had made note of all nests within the plot.

Surveyors would map a winding course from plot to plot through the stand, taking reasonable detours in order to cover a larger area of the forest floor. During these transects, the nearby canopy was scanned for potential nests; at any such sightings the team would stop and climb to confirm the nest, and, as usual, scan for additional nearby nests.

## Data Generation

Without empirical data to work with, I began by generating a dummy dataset. This allowed me to create in silica tests for the statistical model I was developing, so I could confirm both the efficacy of the model in recovering the data generating process, gain familiarity with the problem to better sniff out what aspects of model design would need attention or to be ignored; and finally, simulated data helps us stress test the model in an environment where we have perfect knowledge. This latter benefit is standard practice when formulating new models, so formulating a simulated process would be needed sooner or later.

### Stands of trees, nests
A simulated forest region was generated for each stand of each age/distance combination. The stand is modeled as a square region with side length \\( L=? \\), with trees distributed randomly according to a spatial Poisson distribution with intensity parameter \\( \lambda= \\); this choice means that, for a plot of unit area, the expected number of trees contained within the circle is equal to XXX, matching the average number of trees per plot from the empirical study. We assume the vole nests are distributed such that each tree has a probability \\( v \\) of containing exactly one nest, and probability \\( 1-v \\) of having no nests. Note that this makes the probability of nest presence independent from tree to tree, determined by an independent Bernoulli random draw, while a positive spatial autocorrelation is observed among nests. This will be better accounted for in future, more sophisticated simulations.

### Plots, paths
Next, XX random points are selected within the plot such that no two plots overlap and each plot has at least one tree within its boundary. We performed this sampling by selecting \\(x\\) and \\(y\\) coordinates from the interval \\( [1/2\pi, L-1/2\pi] \\), insuring the plot is contained within the stand, \\( [0,L]\times[0,L] \\), then reject and resample any points that are sampled within \\( 1/\pi \\) units of a prior sample point (overlapping), or which are not within \\( 1/2\pi \\) units of any trees (empty).

We construct the surveyors path as follows: 
(1) label the plot center points \\((x_i, y_i)\\) such that \\( y_1 \leq y_2 \leq ... \leq y_N \\);
(2) begin the path at \\( (x_1, 0) \\), moving vertically from the lower boundary (\\( y=0 \\)) to the first plot centered at \\( (x_1, y_1) \\);
(3) continue laterally to the far boundary, \\( (b_1, y_1) \\) with \\( b_1 = 0 \\) or \\( L \\);
(4) move upwards to the latitude \\( y=y_2 \\);
(5) traverse the \\( y=y_2 \\) line horizontally to the far boundary;
(6) repeat steps (4) and (5) for each increasing index value up to \\( N \\).

See Figure X for an example of the path given a random plot assignment.

<img src="/images/pic01.jpg" alt="Random path through plots" style="width:100px; height:100px;" />

Any nest within a distance of \\(1/\pi\\) is, with a probability \\(p_{gr}\in[0,1]\\), detected. To simulate the resulting confirmatory climb and aerial scan, any nests within \\(1/\pi\\) of that nest are detected with probability \\(p_{tr} > p_{gr}\\).

### 

## Modeling the Data Generation Process
We investigate several methods for modeling the nest-presence data. 

### Occupancy Model
Each plot surveyed is an independent spatial sample, but if we consider each to be a temporal replicate and the detection of one or more nests as the plot being "occupied", we can use an occupancy model to estimate the odds of population presence, as well as our detection probability. Comparing these results across the different stand types (age / distance), we can see how occupancy may be affected by the forest's age and distance to nearby old growth, which we assume houses red voles.

The general model is formulated as follows: An observer at locations \( s_i, i=1, \dots, N \) checks for species presence at distinct, discrete times labeled \(t_0 \leq t_1 \leq \dots \leq t_T\). Let \(\rho \in [0,1]\) represent the true odds of species occupation. We assume the observers do not suffer false positives; that is, if the species is not present, they record no presence with probability \(1\). If the species is present at site $s_i$, time $t_j$, denoted \( E_{i,j} \), the observer sights them with probability \(p\). Let $F_{i,j}$ be a binary random variable, taking the value $1$ only if the observer at \\((s_i, t_j)\\) observes a member of the species:
\\[
\begin{eqnarray} P(F_{i,j} = 1)  &=& P(\textrm{Species detected})\\\\
&=& P(\textrm{Species present}) P(\textrm{Species detected}|\textrm{Species present}) \\\\
 &=& \rho * P(F_{i,j}=1 | E_{i,j}) \\\\
 &=& \rho * p. 
\end{eqnarray}
\\]
In practice, were there only one location, we would have a bernoulli process with parameter \\( \rho * p \\), which we can fit to the data. However, we can transform the parameters as
\\[
\begin{eqnarray}
  \rho \mapsto a \rho \\\\
  p \mapsto p / a
\end{eqnarray}
\\]
with \\(a\\) near enough 1 that \\(a \rho, p/a \in [0,1]\\), and the model is unchanged since \\(Bernoulli(\rho * p) \sim Bernoulli(a \rho * p / a)\\).

Using the data from the simulation described above, we have a collection of observations as follows:

[DataFrame of nest numbers]

In order to fit the statistical model described above 


The major shortcoming of modeling the vole population presence with an occupancy model is that one of the theoretical underpinnings assumes a "closed population," meaning that the species' presence does not change between visits. However, treating spatial replicates as if they were temporal replicates is equivalent to assuming that during the survey either _all_ plots are occupied or _none_ are.

To improve upon this, we can use an N-mixture model, which accounts for ...

### N-Mixture Modeling
Another modeling paradigm for unmarked individuals, sampled randomly within a closed system, is the N-mixture model. This model [REF] 

### ...


## Fitting the Model










