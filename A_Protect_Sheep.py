import sys

def iinp():
    return int(sys.stdin.readline().strip())

def linp():
    return list(map(int, sys.stdin.readline().strip().split()))

def string():
    return sys.stdin.readline().strip()

def lsinp():
    return sys.stdin.readline().strip().split()

def digit():
    return [int(i) for i in (list(sys.stdin.readline().strip()))]

def lchar():
    return list(sys.stdin.readline().strip())

from collections import defaultdict, Counter, deque
from heapq import heappop, heappush, heapify
from math import ceil, floor, gcd, lcm, comb, perm, sqrt
from bisect import bisect_right, bisect_left

def prefixSum(arr):
    n = len(arr)
    prefixSum = [0]
    for i in range(n):
        prefixSum.append(prefixSum[-1] + arr[i])

def Solve():
    smallAlp = 'abcdefghijklmnopqrstuvwxyz'
    capitalAlp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

t = iinp()
for _ in range(t):
    Solve()