# Revisiting t-tests

This post describes a recently developed method for performing t-tests on populations of any size.

## Background

A client of mine works as a healthcare consultant, and part of this work involves surveying the company's employees for their perceived treatment and status in the workplace. This data is then examined along demographic lines to see if a specific subgroup feels unheard, put upon, or otherwise discriminated against. Employee responses could reveal, for example, a company culture where a specific gender feels like it is harder for them to advance, or gain recognition.

My client administered a survey with over 60 questions to each employee at a company. There were 12 questions that used a Likert scale, i.e. the possible responses range across "Strongly Agree", "Agree", "Neither Agree nor Disagree", "Disagree", and "Strongly Disagree". She wanted to use a Student's t-test to determine whether differences in the responses between two groups were statistically significant, and asked for my help in computing and interpreting that statistic.

This may sound trivial to someone whose taken a stats course in the past few years, but there are a number of pitfalls to avoid: How should the data be prepared? How many degrees of freedom are present in the data? Is my sample size large enough for the test to be applicable? While one can simply pump the data into a built-in function in Excel, you may end up with faulty results if you leave these questions unanswered. 

While performing the due diligence on the dataset, I googled my way into a [https://arxiv.org][recent paper] posted to ArXiV that describes an approach to the Student's t-test for two populations, which is valid for *any* number of samples and utilizes some appealing geometry reminiscent of concentration of measure proofs. It wasn't necessary for my use-case to implement the method described here, but I got curious, so we'll review the usual approach to t-tests, then review the contents of the paper and why the new method is effective.

## The traditional two-population t-test



## The approach of XX _et al._



# Results

As a demonstration of the method, we will create synthetic datasets and apply the traditional and new methods, and show how the new approach holds strong where the traditional t-test breaks down.



Ideally, employee treatment would be equitable, so the null hypothesis

