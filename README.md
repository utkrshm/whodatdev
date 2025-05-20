# WhoDatDev - An Akinator Clone for DSC-VIT

## Tech stack

Frontend - NextJS
Backend - Python (FastAPI)
Algorithm - Python

## Algorithm

This algorithm implements a mistake-tolerant version of the Akinator game, designed to guess a person from a dataset by asking a series of yes/no/probably/probably not questions. It loads a dataset of people and their attributes, as well as a set of questions mapped to those attributes. The algorithm maintains a probability distribution over all possible candidates, updating these probabilities after each answer using multipliers for strong and soft matches or mismatches. It selects the next question based on information gain, focusing on attributes that best split the remaining candidates. The game continues until the algorithm is confident enough to make a guess, runs out of questions, or cannot confidently identify a candidate. It also supports handling mistaken guesses and can serialize/restore its state for persistence.
