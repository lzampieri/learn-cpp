import matplotlib.pyplot as plt
import numpy as np
import io


def getPdf(infile):
    plt.figure(figsize=(10,10))
    x = None
    y = None
    z = []


    for line in infile:
        strimline = line.decode('utf8').strip()
        if len(strimline) < 1:
            continue
        if x is None:
            floats = [float(i) for i in strimline.split('\t')]
            if len(floats) != 3:
                return 1, 0
            x = np.arange(floats[0],floats[1]+floats[2],floats[2])
        elif y is None:
            floats = [float(i) for i in strimline.split('\t')]
            if len(floats) != 3:
                return 1, 0
            y = np.arange(floats[0],floats[1]+floats[2],floats[2])
        else:
            z.append( float(strimline) )
    buffer = io.BytesIO()
    plt.contourf(x,y,np.array(z).reshape((x.size,y.size)).transpose())
    plt.savefig(buffer,format='pdf')
    plt.close()
    data = buffer.getvalue()
    return 0, data