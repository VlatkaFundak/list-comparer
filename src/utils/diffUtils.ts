export function getDifferences(data1: string, data2: string, options: string): { title: string, content: string }[] {
    const lines1 = data1.split('\n').map(line => line.trim()).filter(line => line);
    const lines2 = data2.split('\n').map(line => line.trim()).filter(line => line);
    const onlyInFile1 = lines1.filter(line => !lines2.includes(line));
    const onlyInFile2 = lines2.filter(line => !lines1.includes(line));
    const commonLines = lines1.filter(line => lines2.includes(line));

    const results = [];
    
    if (options.includes('a')) {
        results.push({ title: 'Only in File 1', content: onlyInFile1.join('\n') });
    }
    if (options.includes('b')) {
        results.push({ title: 'Only in File 2', content: onlyInFile2.join('\n') });
    }
    if (options.includes('c')) {
        results.push({ title: 'Common Lines', content: commonLines.join('\n') });
    }

    return results;
}