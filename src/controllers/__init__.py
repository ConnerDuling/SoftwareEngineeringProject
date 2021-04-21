import os, glob

def publicize_python_files():
    files = glob.glob(os.path.dirname(__file__)+'/*.py')
    pp = map(lambda f: os.path.basename(f)[:-3], files)
    return list(pp)

__all__ = publicize_python_files()