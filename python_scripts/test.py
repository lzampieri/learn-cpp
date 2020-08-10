import sys, json
import numpy as np

data = np.asarray(sys.stdin.readlines(), dtype=np.float64)

sys.stdout.write(str(sum(data)))