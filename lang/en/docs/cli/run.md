-import React from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; import { Input } from "@/components/ui/input"; import { Textarea } from "@/components/ui/textarea"; import { Sun, Moon, Settings, Mic, Bell, ShieldCheck } from "lucide-react";

export default function App() { return ( <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4"> <header className="flex justify-between items-center mb-6"> <h1 className="text-2xl font-bold">إستيقظ</h1> <div className="flex items-center gap-3"> <Button variant="ghost"><Bell /></Button> <Button variant="ghost"><Settings /></Button> </div> </header>

<Tabs defaultValue="home" className="w-full">
    <TabsList className="grid grid-cols-4 gap-2">
      <TabsTrigger value="home">الرئيسية</TabsTrigger>
      <TabsTrigger value="health">الصحة</TabsTrigger>
      <TabsTrigger value="assistant">المساعد</TabsTrigger>
      <TabsTrigger value="settings">الإعدادات</TabsTrigger>
    </TabsList>

    <TabsContent value="home">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <div className="text-xl font-semibold">مرحباً بك، ماذا تريد أن أفعل؟</div>
          <div className="flex gap-2">
            <Button className="w-full"><Mic className="mr-2" /> تحدث إليّ</Button>
            <Button className="w-full" variant="secondary">ابدأ الآن</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="health">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">الفحص الطبي</h2>
          <Input placeholder="أدخل أعراضك..." />
          <Textarea placeholder="أو تحدث عن حالتك بالتفصيل..." />
          <Button className="w-full mt-2">ابدأ الفحص</Button>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="assistant">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">المساعد الذكي</h2>
          <div className="space-y-2">
            <Button className="w-full">تنظيم الجدول</Button>
            <Button className="w-full">تنبيه بمواعيد الدواء</Button>
            <Button className="w-full">تحديد القبلة ومواقيت الصلاة</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="settings">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">إعدادات الخصوصية</h2>
          <div className="flex justify-between items-center">
            <span>الوضع الليلي</span>
            <Button variant="ghost"><Moon /></Button>
          </div>
          <div className="flex justify-between items-center">
            <span>الأمان والخصوصية</span>
            <Button variant="ghost"><ShieldCheck /></Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>

); }

import React from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; import { Input } from "@/components/ui/input"; import { Textarea } from "@/components/ui/textarea"; import { Sun, Moon, Settings, Mic, Bell, ShieldCheck, Calculator, Music2 } from "lucide-react";

export default function App() { return ( <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4"> <header className="flex justify-between items-center mb-6"> <h1 className="text-2xl font-bold">إستيقظ</h1> <div className="flex items-center gap-3"> <Button variant="ghost"><Bell /></Button> <Button variant="ghost"><Settings /></Button> </div> </header>

<Tabs defaultValue="home" className="w-full">
    <TabsList className="grid grid-cols-5 gap-2">
      <TabsTrigger value="home">الرئيسية</TabsTrigger>
      <TabsTrigger value="health">الصحة</TabsTrigger>
      <TabsTrigger value="assistant">المساعد</TabsTrigger>
      <TabsTrigger value="study">الدراسة</TabsTrigger>
      <TabsTrigger value="settings">الإعدادات</TabsTrigger>
    </TabsList>

    <TabsContent value="home">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <div className="text-xl font-semibold">مرحباً بك، ماذا تريد أن أفعل؟</div>
          <div className="flex gap-2">
            <Button className="w-full"><Mic className="mr-2" /> تحدث إليّ</Button>
            <Button className="w-full" variant="secondary">ابدأ الآن</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="health">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">الفحص الطبي</h2>
          <Input placeholder="أدخل أعراضك..." />
          <Textarea placeholder="أو تحدث عن حالتك بالتفصيل..." />
          <Button className="w-full mt-2">ابدأ الفحص</Button>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="assistant">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">المساعد الذكي</h2>
          <div className="space-y-2">
            <Button className="w-full">تنظيم الجدول</Button>
            <Button className="w-full">تنبيه بمواعيد الدواء</Button>
            <Button className="w-full">تحديد القبلة ومواقيت الصلاة</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="study">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Calculator /> المساعد الدراسي</h2>
          <Input placeholder="أدخل المعادلة أو السؤال الدراسي" />
          <Button className="w-full mt-2">حل السؤال</Button>
          <h3 className="text-md font-medium mt-4 flex items-center gap-2"><Music2 /> تعرف على الموسيقى أو النوتة</h3>
          <Input placeholder="ارفع أو سجل الصوت للتعرف عليه" />
          <Button className="w-full mt-2">تحليل الصوت</Button>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="settings">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">إعدادات الخصوصية</h2>
          <div className="flex justify-between items-center">
            <span>الوضع الليلي</span>
            <Button variant="ghost"><Moon /></Button>
          </div>
          <div className="flex justify-between items-center">
            <span>الأمان والخصوصية</span>
            <Button variant="ghost"><ShieldCheck /></Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>

); }

import React from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; import { Input } from "@/components/ui/input"; import { Textarea } from "@/components/ui/textarea"; import { Sun, Moon, Settings, Mic, Bell, ShieldCheck, Calculator, Music2, Brain, Lock, Clock, HeartPulse, Book, MapPin, Compass, Camera } from "lucide-react";

export default function App() { return ( <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4"> <header className="flex justify-between items-center mb-6"> <h1 className="text-2xl font-bold">إستيقظ</h1> <div className="flex items-center gap-3"> <Button variant="ghost"><Bell /></Button> <Button variant="ghost"><Settings /></Button> </div> </header>

<Tabs defaultValue="home" className="w-full">
    <TabsList className="grid grid-cols-5 gap-2">
      <TabsTrigger value="home">الرئيسية</TabsTrigger>
      <TabsTrigger value="health">الصحة</TabsTrigger>
      <TabsTrigger value="assistant">المساعد</TabsTrigger>
      <TabsTrigger value="study">الدراسة</TabsTrigger>
      <TabsTrigger value="extras">إضافات</TabsTrigger>
    </TabsList>

    <TabsContent value="home">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <div className="text-xl font-semibold">مرحباً بك، ماذا تريد أن أفعل؟</div>
          <div className="flex gap-2">
            <Button className="w-full"><Mic className="mr-2" /> تحدث إليّ</Button>
            <Button className="w-full" variant="secondary">ابدأ الآن</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="health">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">الفحص الطبي</h2>
          <Input placeholder="أدخل أعراضك..." />
          <Textarea placeholder="أو تحدث عن حالتك بالتفصيل..." />
          <Button className="w-full mt-2">ابدأ الفحص</Button>
          <h2 className="text-lg font-semibold mt-6">الدعم النفسي والإدمان</h2>
          <Textarea placeholder="تحدث عن شعورك..." />
          <Button className="w-full mt-2">طلب المساعدة</Button>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="assistant">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">المساعد الذكي</h2>
          <div className="space-y-2">
            <Button className="w-full"><Clock className="mr-2" /> تنظيم الجدول</Button>
            <Button className="w-full"><HeartPulse className="mr-2" /> تنبيه بمواعيد الدواء</Button>
            <Button className="w-full"><MapPin className="mr-2" /> تحديد القبلة ومواقيت الصلاة</Button>
            <Button className="w-full"><Compass className="mr-2" /> بوصلة النجوم والموقع</Button>
            <Button className="w-full"><Camera className="mr-2" /> التعرف على الأشياء بالصور</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="study">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Calculator /> المساعد الدراسي</h2>
          <Input placeholder="أدخل المعادلة أو السؤال الدراسي" />
          <Button className="w-full mt-2">حل السؤال</Button>
          <h3 className="text-md font-medium mt-4 flex items-center gap-2"><Music2 /> تعرف على الموسيقى أو الصوت</h3>
          <Input placeholder="ارفع أو سجل الصوت للتعرف عليه" />
          <Button className="w-full mt-2">تحليل الصوت</Button>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="extras">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">الإضافات</h2>
          <Button className="w-full"><Lock className="mr-2" /> الحصالة الرقمية (تفتح بوقت محدد)</Button>
          <Button className="w-full"><Brain className="mr-2" /> اختبار وتحليل شخصية</Button>
          <Button className="w-full"><Book className="mr-2" /> اقتراح كتب ونصائح لتنمية العقل</Button>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>

); }

import React, { useState } from "react";
import { Button, Input, Card, CardContent } from "@/components/ui"; 
import { Camera } from "lucide-react"; 

export default function ImageRecognition() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    // استخدم TensorFlow.js أو API التعرف على الصورة هنا
    // هنا نحن سنستخدم مثلا نموذج بسيط
    const analysisResult = "هذه صورة لقط في الحديقة"; // استبدله بالنتيجة الفعلية من النموذج
    setDescription(analysisResult);
  };

  return (
    <div className="p-4">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-semibold">التعرف على الأشياء بالصور</h2>
          <div>
            <Input type="file" onChange={handleImageUpload} />
            <Button className="mt-4" onClick={analyzeImage}>
              <Camera className="mr-2" /> تحليل الصورة
            </Button>
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="w-full mt-4 border-2 border-gray-600"
              />
            )}
            {description && (
              <div className="mt-4 text-white">{description}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}npm install @tensorflow/tfjs @tensorflow-models/mobilenetimport React, { useState, useEffect } from "react";
import { Button, Input, Card, CardContent } from "@/components/ui"; 
import { Camera } from "lucide-react"; 
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs'; // Import TensorFlow.js

export default function ImageRecognition() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [model, setModel] = useState(null);

  // تحميل النموذج عند بداية التشغيل
  useEffect(() => {
    const loadModel = async () => {
      const model = await mobilenet.load();
      setModel(model);
    };
    loadModel();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (model && image) {
      const imgElement = document.createElement("img");
      imgElement.src = image;
      imgElement.onload = async () => {
        // تصنيف الصورة باستخدام MobileNet
        const predictions = await model.classify(imgElement);
        setDescription(`التصنيف: ${predictions[0].className}, الاحتمال: ${predictions[0].probability.toFixed(2)}`);
      };
    }
  };

  return (
    <div className="p-4">
      <Card className="bg-gray-800 shadow-lg rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-semibold">التعرف على الأشياء بالصور</h2>
          <div>
            <Input type="file" onChange={handleImageUpload} />
            <Button className="mt-4" onClick={analyzeImage}>
              <Camera className="mr-2" /> تحليل الصورة
            </Button>
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="w-full mt-4 border-2 border-gray-600"
              />
            )}
            {description && (
              <div className="mt-4 text-white">{description}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}-
id: docs_cli_run
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Runs a defined package script.</p>

You may define [`scripts`]({{url_base}}/docs/package-json#toc-scripts) in your
[`package.json`]({{url_base}}/docs/package-json) file.

```json
{
  "name": "my-package",
  "scripts": {
    "build": "babel src -d lib",
    "test": "jest"
  }
}
```

##### `yarn run [script] [<args>]` <a class="toc" id="toc-yarn-run-script" href="#toc-yarn-run-script"></a>

If you have defined a `scripts` object in your package, this command will run
the specified `[script]`. For example:

```sh
yarn run test
```

Running this command will execute the script named `"test"` in your
`package.json`.

You can pass additional arguments to your script by passing them after the script name.

```sh
yarn run test -o --watch
```

Running this command will execute `jest -o --watch`.

`[script]` can also be any locally installed executable that is inside `node_modules/.bin/`.

It's also possible to leave out the `run` in this command, each script can be executed with its name:

```sh
yarn test -o --watch
```

Running this command will do the same as `yarn run test -o --watch`. Note that built-in cli commands will have preference over your scripts, so you shouldn't always rely on this shortcut in other scripts.

By default, a specified `[script]` can be prefixed with `pre` or `post` to execute before another. 

```json
{
  "name": "my-package",
  "scripts": {
    "build": "babel src -d lib",
    "prebuild": "jest"
  }
}
```
Running `yarn run build` will execute `yarn run prebuild` prior to `yarn build`.

##### `yarn run env` <a class="toc" id="toc-yarn-run-env" href="#toc-yarn-run-env"></a>

Running this command will list environment variables available to the scripts at runtime.

If you want to override this command, you can do so by defining your own `"env"` script in `package.json`.

##### `yarn run` <a class="toc" id="toc-yarn-run" href="#toc-yarn-run"></a>

If you do not specify a script to the `yarn run` command, the `run` command
will list all of the scripts available to run for a package.
