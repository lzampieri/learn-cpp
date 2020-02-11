import matplotlib.pyplot as plt
import io


def getPdf(infile):
    plt.figure(figsize=(10,10))

    x = []
    y = []

    for line in infile:
        strimline = line.decode('utf8').strip()
        if(len(strimline)>0):
            floats = [float(i) for i in strimline.split('\t')]
            if len(floats) != 2:
                return 1, 0
            x.append(floats[0])
            y.append(floats[1])
    plt.scatter(x,y)
    buffer = io.BytesIO()
    plt.savefig(buffer,format='pdf')
    plt.close()
    data = buffer.getvalue()
    return 0, data