import sys, io
import numpy as np
import matplotlib.pyplot as plt

data = np.zeros((2,0))
for line in sys.stdin.readlines():
    readed = np.fromstring(line.replace('\t',' '), dtype=float, sep=' ')
    if( readed.shape[0] != 2):
        raise TypeError('Wrong shape of the input file. Expected rows of 2 floats each.')
    data = np.append(data,readed)

plt.figure()
plt.plot(data)
plt.title("Test")

plt.savefig(sys.stdout.buffer, format='png')
