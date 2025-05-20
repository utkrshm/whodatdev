# WhoDatDev - An Akinator Clone for DSC-VIT

## Tech stack

Frontend - NextJS

Backend - Python (FastAPI)

Algorithm - Python

## Algorithm

The algorithm creates a very close clone of the Akinator game, designed to guess a person from a dataset by asking a series of yes/no/probably/probably not questions despite errors from the user's end. It loads a dataset of people and their attributes associated with them, as well as a set of questions mapped to those attributes.

The algorithm maintains a probability distribution over all possible candidates, initially assigning equal probability to each. As the user answers questions (with options like yes, no, probably, or probably not), the algorithm updates these probabilities using a set of multipliers that reflect the strength of the match or mismatch between the user's answer and each candidate's attributes. Strong matches increase a candidate’s probability, while mismatches decrease it, and “probably” answers apply softer adjustments.

To select the next question, the algorithm calculates the expected information gain for each unasked attribute, focusing on those that best split the remaining candidates and maximize uncertainty reduction. This ensures that each question is as informative as possible, quickly narrowing down the possibilities. The process continues until the algorithm is confident enough to make a guess or exhausts its questions.