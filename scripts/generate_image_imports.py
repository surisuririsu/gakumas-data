import glob

image_dirs = ["idols", "pItems", "skillCards"]

for dir in image_dirs:
  ids = [path.split("\\")[1].split(".")[0] for path in glob.glob(f"images/{dir}/*.png")]

  with open(f"images/{dir}/imports.js", "w", encoding="utf-8") as f:
    for id in ids:
      f.write(f"import image_{id} from \"./{id}.png\";\n")

    f.write("\n")
    f.write("const IMAGES = {\n")
    for id in ids:
      f.write(f"  {id}: image_{id},\n")
    f.write("};\n")
    f.write("\n")
    f.write("export default IMAGES;\n")
